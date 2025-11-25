import { AIService } from "../types";
import { OpenRouterService } from "./openRouterService";

export class AIServiceFactory {
    private static instance: AIService;

    static getService(): AIService {
        if (!this.instance) {
            console.log("AIServiceFactory: Initializing OpenRouterService (Exclusive Mode)");
            this.instance = new OpenRouterService();
        }
        return this.instance;
    }
}
