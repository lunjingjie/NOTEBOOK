import { UnknownFunc } from "@heimdallr-sdk/types";

export class Subscribe {
  dep: Map<string, UnknownFunc[]> = new Map();

  /**
   * 事件订阅
   * @param eventName 
   * @param callback 
   */
  watch(eventName: string, callback: (data: any) => any) {
    const fns = this.dep.get(eventName);
    if (fns) {
      this.dep.set(eventName, fns.concat(callback))
      return;
    }
    this.dep.set(eventName, [callback])
  }

  /**
   * 派发事件
   * @param eventName 
   * @param data 
   */
  notify<D = any>(eventName: string, data: D) {
    const fns = this.dep.get(eventName);
    if (!eventName || !fns) {
      return;
    }

    fns.forEach((fn) => {
      try {
        fn(data);
      } catch (error) {
        console.error(error);
      }
    });
  }
}