/* eslint-disable curly */
import * as vscode from 'vscode';
import { CommandHander } from './commands';

/**
 * 注册指令
 * @param commandStr 指令名
 * @param topic 指令中需要创建的模块
 * @param type 指令状态，init 初始化整个模块 | add 创建模块的一部分
 */
 export const registerCommand = (commandStr: string, topic: string, type: 'init' | 'add' = 'add') => {
  if (vscode.workspace === undefined) vscode.window.showErrorMessage('Please select a workspace first');
  return vscode.commands.registerCommand(commandStr, (resource: vscode.Uri) => new CommandHander(topic, resource, type));
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		/** 初始化完整模块 */
		registerCommand('extension.Modules', 'modules', 'init'),
		registerCommand('extension.Extends', 'extends', 'init'),
		/** 创建 module.ts */
		registerCommand('extension.Module.ts', 'module'),
		/** 创建常用模块目录 */
		registerCommand('extension.Controller', 'controller'),
		registerCommand('extension.Service', 'service'),
		registerCommand('extension.Provider', 'provider'),
		registerCommand('extension.BO', 'bo'),
		registerCommand('extension.DTO', 'dto'),
		registerCommand('extension.Filter', 'filter'),
		registerCommand('extension.Guard', 'guard'),
		registerCommand('extension.Interceptor', 'interceptor'),
		registerCommand('extension.Pipe', 'pipe'),
	);
}

export function deactivate() { }
