import { BasePluginType, BreadcrumbLevel, BrowserBreadcrumbTypes, BrowserErrorTypes, ConsoleTypes, EventTypes, ReportDataType, TAG } from "@monitor-sdk/types";
import { formatDate, generateUUID, hasConsole } from "@monitor-sdk/utils";
import { CodeErrorType, ResourceErrorType } from "../types";

// 事件类型
interface CollectedType {
  category: EventTypes;
  data: Event;
}

interface ResourceTarget {
  src?: string;
  href?: string;
  localName?: string;
}

function log(message: any, type: ConsoleTypes = ConsoleTypes.WARN): void {
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

const errorPlugin: BasePluginType = {
  name: 'jsErrorPlugin',
  monitor(notify: (data: CollectedType) => void) {
    window.addEventListener('error', (e) => {
      e.preventDefault();
      log(e, ConsoleTypes.ERROR);
      notify({
        category: EventTypes.ERROR,
        data: e,
      });
    }, true);
  },
  transform(collectedData: CollectedType): ReportDataType<ResourceErrorType | CodeErrorType> {
    const { category, data } = collectedData;
    const { localName, src, href } = (data.target as ResourceTarget) || {};
    const id = generateUUID();
    const time = formatDate();
    if (localName) {
      // 资源加载错误
      const resourceData = {
        source_type: localName,
        href: src || href,
      }
      // 上报用户行为栈
      this.breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.RESOURCE,
        level: BreadcrumbLevel.FATAL,
        message: `Unable to load "${resourceData.href}"`,
      });

      const breadcrumb = this.breadcrumb.getStack();
      return {
        id,
        time,
        type: category,
        breadcrumb,
        data: {
          sub_type: BrowserErrorTypes.RESOURCEERROR,
          ...resourceData
        }
      };
    }
    // 代码错误
    // 代码错误
    const { message, lineno, colno, filename } = data as ErrorEvent;
    // 上报用户行为栈
    this.breadcrumb.unshift({
      eventId: id,
      type: BrowserBreadcrumbTypes.CODE_ERROR,
      level: BreadcrumbLevel.ERROR,
      message
    });
    const breadcrumb = this.breadcrumb.getStack();
    return {
      id,
      time,
      type: category,
      breadcrumb,
      data: {
        sub_type: BrowserErrorTypes.CODEERROR,
        message,
        lineno,
        colno,
        filename
      }
    };
  }
};

export default errorPlugin;