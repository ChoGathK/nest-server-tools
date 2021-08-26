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
		/** 创建目录 */
		registerCommand('extension.Shared', 'shared', 'init'),
		registerCommand('extension.Common', 'common', 'init'),
		/** 创建模块 */
		registerCommand('extension.Modules', 'modules', 'init'),
		registerCommand('extension.Extends', 'extends', 'init'),
		/** 创建文件 */
		registerCommand('extension.Module.File', 'module'),
		registerCommand('extension.Sequelize.File', 'sequelize'),
		/** 创建目录/文件 */
		registerCommand('extension.BO', 'bo'),
		registerCommand('extension.Controller', 'controller'),
		registerCommand('extension.Decorator', 'decorator'),
		registerCommand('extension.DTO', 'dto'),
		registerCommand('extension.Filter', 'filter'),
		registerCommand('extension.Guard', 'guard'),
		registerCommand('extension.Interceptor', 'interceptor'),
		registerCommand('extension.Pipe', 'pipe'),
		registerCommand('extension.Provider', 'provider'),
		registerCommand('extension.Service', 'service'),
	);
}

export function deactivate() { }
