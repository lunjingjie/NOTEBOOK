import { INodeSchema } from "./document";

export interface IDesignerEngine {
	getLanguage(): string;
  setLanguage(lang: string): void;
  setSelectionMode(mode: SelectionMode): void;
  createDocument(schema: INodeSchema): IDocument,
	getDocument(id: ID): IDocument | null,
	getNodeDocument(nodeId: ID): IDocument | null,
	getAllDocuments(): IDocument[] | null

	getMonitor(): IMonitor
	getShell(): IDesignerShell
	getComponentManager(): IComponentManager
	getResourceManager(): IResourceManager
	getLoacalesManager(): ILocalesManager
	getDecoratorManager(): IDecoratorManager
	getActions(): IActions

	registerPlugin(pluginFactory: IPluginFactory): void
	getPlugin(name: string): IPlugin | null

	dispatch(action: IAction<any>): void
	destory(): void

	getNodeBehavior(nodeId: ID): NodeBehavior
}
