import { window } from 'vscode';

/** 文本内容工具，用于文本处理 */
export class TextUtils {
  /** 判断无效文本 */
  private static readonly invalid = /^(\d|\-)|[\\\s+={}\(\)\[\]"`/;,:.*?'<>|#$%^@!~&]|\-$/;

  /** 判断大写字母文本 */
  private static readonly upperCase = /[A-Z]/g;

  /** 首字符大写 */
  public static firstToUpperCase(text: string) {
    return text.replace(text[0], text[0].toUpperCase());
  }

  /** 首字符小写 */
  public static firstToLowerCase(text: string) {
    return text.replace(text[0], text[0].toLowerCase());
  }

  /** 将驼峰转换为横线拼接：userName --> user-name */
  public static upperCaseToLine (text: string) {
    return this.firstToLowerCase(text.replace(this.upperCase, _1 => `-${_1.toLowerCase()}`));
  }

  /** 将横线拼接转换为驼峰 user-name --> userName */
  public static lineToUpperCase (text: string) {
    return this.firstToLowerCase(text.split('-').map(e => this.firstToUpperCase(e)).join(''));
  }

  /** 验证文本内容 */
  public static verify(text: string) {
    if ([null, undefined, NaN, ''].includes(text)) {
      window.showErrorMessage('输入为空，请重试');
      return false;
    }

    if (this.upperCase.test(text[0])) {
      window.showErrorMessage('首字母不允许为大写，请重试');
      return false;
    }

    if (this.invalid.test(text)) {
      window.showErrorMessage('无效的名称，请检查名称中是否有特殊符号后重试');
      return false;
    }

    return true;
  }
}
