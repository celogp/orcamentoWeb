import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { APP_CONSTANTES } from "../app.config";

@Injectable()
export class utilService {

    constructor(
        private messageService: MessageService 
        ) { }

    doApresentaMensagens(lstMensagens: any, severity:string){
        if  (typeof lstMensagens == "string"){
            this.messageService.add({ severity: severity, summary: severity, detail: lstMensagens, life: APP_CONSTANTES.TIMEOUTMSG });
        }else{
            lstMensagens.forEach( (mensagem:string) => {
                if (severity == 'error') {
                    this.messageService.add({ severity: severity, summary: severity, detail: mensagem, life: APP_CONSTANTES.TIMEOUTMSG });
                }
            });
        }
      }   
}