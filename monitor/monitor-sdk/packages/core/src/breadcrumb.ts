import { BaseOptionsType, BreadcrumbLevel, BreadcrumbPushData } from "@monitor-sdk/types";

export class Breadcrumb<O extends BaseOptionsType> {
  private readonly maxBreadcrumbs: number;
  private stack: BreadcrumbPushData[];

  constructor(options: Partial<O> = {}) {
    this.maxBreadcrumbs = options.maxBreadcrumbs || 5;
    this.stack = [];
  }

  unshift(data: BreadcrumbPushData): BreadcrumbPushData[] {
    if (!data.time) {
      data.time = new Date().getTime();
    }
    if (!data.level) {
      data.level = BreadcrumbLevel.INFO;
    }
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.pop();
    }

    this.stack.unshift(data);
    this.stack.sort((a, b) => b.time - a.time);
    return this.stack;
  }

  private pop() {
    return this.stack.pop() !== undefined;
  }

  clear(): void {
    this.stack = [];
  }

  getStack(): BreadcrumbPushData[] {
    // 复制数组
    return this.stack.slice(0);
  }
}