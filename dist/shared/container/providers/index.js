"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var IStorageProvider_1 = __importDefault(require("./StorageProvider/models/IStorageProvider"));
var DiskStorageProvider_1 = __importDefault(require("./StorageProvider/implementations/DiskStorageProvider"));
var IMailProvider_1 = __importDefault(require("./MailProvider/models/IMailProvider"));
var EtherealMailProvider_1 = __importDefault(require("./MailProvider/implementations/EtherealMailProvider"));
var IMailTemplateProvider_1 = __importDefault(require("./MailTemplateProvider/models/IMailTemplateProvider"));
var HandlebarsMailTemplateProvider_1 = __importDefault(require("./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"));
var ICacheProvider_1 = __importDefault(require("./CacheProvider/models/ICacheProvider"));
var RedisCacheProvider_1 = __importDefault(require("./CacheProvider/implementations/RedisCacheProvider"));
require("./CacheProvider/index");
//container.registerSingleton<ICacheProvider>('IacheProvider',RedisCacheProvider)
tsyringe_1.container.registerSingleton('StorageProvider', DiskStorageProvider_1.default);
tsyringe_1.container.registerSingleton('MailTemplateProvider', HandlebarsMailTemplateProvider_1.default);
tsyringe_1.container.registerInstance('MailProvider', tsyringe_1.container.resolve(EtherealMailProvider_1.default));
