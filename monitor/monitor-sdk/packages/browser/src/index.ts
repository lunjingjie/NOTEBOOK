import { Breadcrumb, Core } from "@monitor-sdk/core";
import { BrowserOptionsType, BrowserReportPayloadDataType } from "./types";
import { BrowserReportType, IAnyObject, PlatformTypes } from "@monitor-sdk/types";
import { beacon, formatDate, generateUUID, get, imgRequest, post } from "@monitor-sdk/utils";
import { nextTick } from "./lib/nextTick";
import jsErrorPlugin from './plugins/jsError';

class BrowserClient extends Core<BrowserOptionsType> {
  private readonly breadcrumb: Breadcrumb<BrowserOptionsType>;
  protected sessionID: string;

  constructor(options: BrowserOptionsType) {
    // 继承调用父类的构造函数
    super(options);
    this.breadcrumb = new Breadcrumb(options);
  }

  async initAPP() {
    const { initUrl, app } = this.context;
    const ctime = formatDate();
    const params = {
      id: generateUUID(),
      ...app,
      ctime,
    };
    const { data } = await this.report(initUrl, params, BrowserReportType.GET);
    const { id = '' } = data || {};
    return id;
  }

  nextTick(cb: Function, ctx: Object, ...args: any[]) {
    return nextTick(cb, ctx, ...args);
  }

  transform(datas: IAnyObject): BrowserReportPayloadDataType {
    if (!datas) {
      return null;
    }

    const { userAgent, language } = navigator;
    const title = document;
    const { href } = location;

    return {
      session_id: this.sessionID,
      platform: PlatformTypes.BROWSER,
      page_title: href,
      language,
      user_agent: userAgent,
      ...datas,
    }
  }

  isRightEnv(): boolean {
    return typeof window !== 'undefined';
  }

  report(url: string, data: IAnyObject, type: BrowserReportType = BrowserReportType.BEACON) {
    // sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能
    if (type === BrowserReportType.BEACON && navigator.sendBeacon) {
      beacon(url, data);
      return;
    }
    if (type === BrowserReportType.IMG || !navigator.sendBeacon) {
      imgRequest(url, data);
      return;
    }
    if (type === BrowserReportType.POST) {
      post(url, data);
      return;
    }
    return get(url, data);
  }
}

// 初始化默认使用哪些插件
function init(options: BrowserOptionsType) {
  const client = new BrowserClient(options);
  const { plugins = [] } = options;
  client.use([jsErrorPlugin, ...plugins]);
}

export default init;