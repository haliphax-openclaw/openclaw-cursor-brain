declare module "openclaw/plugin-sdk" {
  export interface PluginLogger {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
  }

  export interface OpenClawPluginApi {
    config: Record<string, any>;
    pluginConfig: Record<string, unknown> | undefined;
    logger: PluginLogger;
    runtime: {
      config: {
        writeConfigFile(patch: Record<string, any>): Promise<void>;
      };
    };
    resolvePath(rel: string): string;
    /** Lifecycle hooks (gateway_start runs when the gateway starts listening, not on arbitrary CLI invocations). */
    on(
      hookName: "gateway_start" | "gateway_stop",
      handler: (event: Record<string, unknown>, ctx: Record<string, unknown>) => void | Promise<void>,
      opts?: { priority?: number },
    ): void;
    registerCli(
      handler: (ctx: { program: any }) => void,
      opts?: { commands?: string[] },
    ): void;
  }

  export function emptyPluginConfigSchema(): Record<string, unknown>;
}
