/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import { resolve } from 'path';
import { render } from 'mustache';
import { window, Uri } from 'vscode';
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs-extra';

import { TextUtils } from './utils';

/** 指令处理器 */
export class CommandHander {
  /** 当前选中文件的上级目录地址 */
  private readonly parentDir: string;

  constructor(
    private readonly topic: string,
    private readonly resource: Uri,
    private readonly type: 'init' | 'add' = 'add',
  ) {
    this.parentDir = resolve(this.resource.path, '..');
    this.handler();
  }

  /** 获取用户输入的名称 */
  private async currentInput () {
    const input: string = await new Promise((resolve) => {
      resolve(window.showInputBox({ placeHolder: "输入名称（多个单词请用 - 拼接）" }));
    });
    return TextUtils.verify(input) ? input : null;
  }

  /** 命令执行器 */
  private async handler() {
    try {
      if (this.topic === 'shared') {
        this.initShared();
        return;
      } 

      if (this.topic === 'common') {
        this.initCommon();
        return;
      } 

      const input = await this.currentInput();
      if (!input) return;
  
      /** 初始化模块 */
      if (this.type === 'init') {
        if (this.topic === 'modules') this.initModules(input);
        if (this.topic === 'extends') this.initExtends(input);
        return;
      }
  
      /** 判断创建目录还是创建文件 */
      if (
        this.resource.path === `${this.parentDir}/${this.topic}`
        || this.topic === 'module'
        || this.topic === 'sequelize'
      ) {
        this.createFile(input, this.topic);
        return;
      } else {
        this.createFolder(input, this.topic);
        return;
      }
    } catch (error: any) {
      window.showErrorMessage(error.message);
    }
  }

  /** 初始化 Common 目录 */
  private initCommon() {
    const files = ['base', 'type', 'constant', 'enum', 'interface', 'index'];

    if (existsSync(`${this.resource.path}/common`)) {
      return window.showErrorMessage('common 目录已存在');
    }

    /** 创建模块目录 */
    mkdirSync(`${this.resource.path}/common`);

    for (const file of files) {
      writeFileSync(`${this.resource.path}/common/${file}.ts`, '');
    }
  }

  /** 初始化 Shared 目录 */
  private initShared() {
    const files = ['index'];

    if (existsSync(`${this.resource.path}/shared`)) {
      return window.showErrorMessage('shared 目录已存在');
    }

    /** 创建模块目录 */
    mkdirSync(`${this.resource.path}/shared`);

    for (const file of files) {
      writeFileSync(`${this.resource.path}/shared/${file}.ts`, '');
    }
  }

  /** 初始化 Modules 模块 */
  private initModules(input: string) {
    const topics = ['bo', 'dto', 'dao', 'controller', 'service'];

    if (existsSync(`${this.resource.path}/${input}`)) {
      return window.showErrorMessage(`${this.resource.path}/${input} 已存在`);
    }

    /** 创建模块目录 */
    mkdirSync(`${this.resource.path}/${input}`);

    for (const topic of topics) {
      this.createFolder(input,`${input}/${topic}`, topic);
      this.updateBarrelFile(input, `${input}/${topic}`, topic);
    }

    this.createFile(input, 'module', input);
  }

  /** 初始化 Extends 模块 */
  private initExtends(input: string) {
    const topics = ['provider'];

    if (existsSync(`${this.resource.path}/${input}`)) {
      return window.showErrorMessage(`${this.resource.path}/${input} 已存在`);
    }

    /** 创建模块目录 */
    mkdirSync(`${this.resource.path}/${input}`);

    for (const topic of topics) {
      this.createFolder(input,`${input}/${topic}`, topic);
      this.updateBarrelFile(input, `${input}/${topic}`, topic);
    }

    this.createFile(input, 'module', input);
  }

  /** 创建文件 */
  private createFile(input: string, topic: string, specified = '') {
    const fileName = topic === 'module' ? 'module' : TextUtils.upperCaseToLine(input);

    const upperName = input.includes('-')
      ? TextUtils.firstToUpperCase(TextUtils.lineToUpperCase(input))
      : TextUtils.firstToUpperCase(input);
  
    const newFilePath = `${this.resource.path}${specified ? `/${specified}` : ''}/${fileName}.ts`;

    if (existsSync(newFilePath)) {
      return window.showErrorMessage(`${fileName} 文件已存在`);
    }

    // 兼容 modules-provider 的创建
    if (topic === 'provider' && this.resource.path.includes('/src/modules/')) {
      topic = 'module-provider';
    }

    // 创建模块文件
    const templatePath = resolve(__dirname, `../public/templates/${topic}.mustache`);
    const templateData = readFileSync(templatePath, 'utf8');
    const newFileData = render(templateData, { upperName, fileName });
    writeFileSync(newFilePath, `${newFileData}\n`);

    // 更新桶文件引用
    const barrelPath = resolve(__dirname, `../public/templates/barrel.mustache`);
    const barrelData = readFileSync(barrelPath, 'utf8');
    const barreFilePath = `${this.resource.path}${specified ? `/${specified}` : ''}/index.ts`;
    const barrelFileData = render(barrelData, { fileName });

    if (existsSync(barreFilePath)) {
      // 如果已经有引用记录则无需新增
      if (!readFileSync(barreFilePath).includes(barrelFileData)) {
        appendFileSync(barreFilePath, `${barrelFileData}\n`);
      };
    } else {
      writeFileSync(barreFilePath, `${barrelFileData}\n`);
    }
  }

  /** 创建目录 */
  private createFolder(input: string, topic: string, specified = '') {
    const currTopic = specified ? specified : topic;
    const fileName = TextUtils.upperCaseToLine(input);
    const upperName = input.includes('-')
      ? TextUtils.firstToUpperCase(TextUtils.lineToUpperCase(input))
      : TextUtils.firstToUpperCase(input);

    /** 创建主题目录 */
    if (existsSync(`${this.resource.path}/${topic}`)) {
      return window.showErrorMessage(`${this.resource.path}/${topic} 已存在`);
    }

    // 创建模块文件
    mkdirSync(`${this.resource.path}/${topic}`);

    // 这里用 this.topic 的原因是 init module 时 topic 会传为 module/`topic`
    const templatePath = resolve(__dirname, `../public/templates/${currTopic}.mustache`);
    const templateData = readFileSync(templatePath, 'utf8');
    const newFileData = render(templateData, { upperName, fileName });
    const newFilePath = `${this.resource.path}/${topic}/${fileName}.ts`;
    writeFileSync(newFilePath, `${newFileData}\n`);

    const barrelPath = resolve(__dirname, `../public/templates/barrel.mustache`);
    const barreleData = readFileSync(barrelPath, 'utf8');
    const barrelFileData = render(barreleData, { fileName });
    const barrelFilePath = `${this.resource.path}/${topic}/index.ts`;

    if (existsSync(barrelFileData)) {
      return window.showErrorMessage('index.ts 已存在');
    }

    writeFileSync(barrelFilePath, `${barrelFileData}\n`);
  }

  /** 更新目录桶文件（index.ts） */
  private updateBarrelFile(input: string, topic: string, specified = '') {
    const fileName = specified ? specified : topic;
    const templatePath = resolve(__dirname, `../public/templates/barrel.mustache`);
    const templateData = readFileSync(templatePath, 'utf8');
    const newFileData = render(templateData, { fileName });
    const newFilePath = `${this.resource.path}/${input}/index.ts`;

    existsSync(newFilePath) 
      ? appendFileSync(newFilePath, `${newFileData}\n`)
      : writeFileSync(newFilePath, `${newFileData}\n`);
  }
}
