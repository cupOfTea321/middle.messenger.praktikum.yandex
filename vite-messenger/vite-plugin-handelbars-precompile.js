"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
function vitePluginHandlebarsPrecompile() {
    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(code, id) {
            if (id.endsWith('.hbs') || id.endsWith('.handlebars')) {
                return {
                    code: `
                        import Handlebars from 'handlebars';
                    
                        export default Handlebars.template(${handlebars_1.default.precompile(code)});    
                    `,
                };
            }
        }
    };
}
exports.default = vitePluginHandlebarsPrecompile;
