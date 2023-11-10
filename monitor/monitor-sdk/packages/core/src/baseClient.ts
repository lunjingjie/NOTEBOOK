import { BaseOptionsType, BasePluginType, ConsoleTypes, IAnyObject, TAG } from "@monitor-sdk/types";
import { CoreContextType } from "./types";
import { formateUrlPath, hasConsole } from "@monitor-sdk/utils";
import { Subscribe } from "./lib/subscribe";

/**
 * 核心抽象类
 * @export
 * @abstract
 * @class Core
 * @template O 配置信息
 */
export abstract class Core<O extends BaseOptionsType> {
  private readonly options: O;

  public context: CoreContextType;
  protected appID: string;
  protected readonly taskQueue: Array<IAnyObject>;
  private isReady: boolean;

  constructor(options: O) {
    if (!this.isRightEnv()) {
      this.log('Client does not match the environment');
      return;
    }

    this.isReady = false;
    this.taskQueue = [];
    this.options = options;
    // 绑定传入构造器的配置
    this.bindOptions();
    this.initApp().then((id) => {
      if (id && this.appID !== id) {
        this.appID = id;
      }
      this.isReady = true;
      this.executeTaskQueue();
    });
  }

  executeTaskQueue() {
    const { uploadUrl } = this.context;
    while (this.taskQueue.length) {
      const task = this.taskQueue.shift();
      this.nextTick(this.report, this, uploadUrl, { app_id: this.appID, ...task });
    }
  }

  abstract nextTick(cb: Function, ctx: Object, ...args: any[]): void;

  /**
   * 绑定配置
   */
  private bindOptions() {
    const { dsn, app, debug = false, enabled = true } = this.options;
    if (!app || !dsn) {
      this.log('Missing app or dsn in options');
      return;
    }

    const { host, init, upload = '' } = dsn;
    const initUrl = formateUrlPath(host, init);
    const uploadUrl = formateUrlPath(host, upload);

    this.context = {
      app,
      uploadUrl,
      initUrl,
      debug,
      enabled,
    };
  }

  use(plugins: BasePluginType[]) {
    const { uploadUrl, enabled } = this.context;
    const sub = new Subscribe();
    for (const plugin of plugins) {
      plugin.monitor.call(this, sub.notify.bind(sub, plugin.name));
      const callback = (...args: any[]) => {
        const pluginDatas = plugin.transform.apply(this, args);
        const datas = this.transform(pluginDatas);
        if (!datas) {
          return;
        }
        if (!enabled) {
          return;
        }
        if (!this.isReady) {
          // 暂存任务
          this.taskQueue.push(datas);
          return;
        }

        this.nextTick(this.report, this, uploadUrl, { app_id: this.appID, ...datas });
      };

      sub.watch(plugin.name, callback);
    }
  }

  /**
   * 抽象方法，端的个性化数据，需子类自己实现
   * @param {IAnyObject} datas
   */
  abstract transform(datas: IAnyObject): IAnyObject;

  /**
   * 初始化应用
   * @return {string} 应用id
   */
  abstract initApp(): Promise<string>;

  abstract isRightEnv(): boolean;

  /**
   * 获取客户端配置
   */
  getClientOptions() {
    return { ...this.options };
  }

  log(message: any, type: ConsoleTypes = ConsoleTypes.WARN): void {
    const { debug } = this.context;
    // 如果不存在console方法，或配置了不输出信息到控制台，则返回
    if (!hasConsole() || !debug) {
      return;
    }
    const func = console[type] as (...data: any[]) => void;
    if (typeof func !== 'function') {
      this.log('Type does not exist');
      return;
    }

    func(TAG, message);
  }

   /**
   * 抽象方法，端的请求方式不一致，需子类自己实现
   * @param {string} url - 接口地址
   * @param {} type - 请求方式（枚举类型，各端有差异）
   * @param {IAnyObject} datas - 上传数据
   */
   abstract report(url: string, datas: IAnyObject, type?: any): void;
}