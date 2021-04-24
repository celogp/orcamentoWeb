import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { financeiroServico } from '../financeiro/financeiro.servico';
import { utilService } from '../utils/util.servico';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    dataSource: any;
    optionsObject: any;
    maxY = 1000;

    constructor(private _utilService: utilService, 
      private _financeiroServico : financeiroServico, 
      private _appComponent : AppComponent) {
        this._appComponent.titleForm = "Home"
        this.optionsObject = {
            legend: {
              display: true,
              labels: {
                fontColor: "blue",
                fontSize: 25
              }
            },
      
            title: {
              display: true,
              text: "% Total Percentage",
              position: "center"
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    show: false,
                  },
                  ticks: {
                    beginAtZero: true,
                    max: this.maxY,
                    min: 0
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    display: true,
                    beginAtZero: 0
                  }
                }
              ]
            }
          };
        this.doCreateChart();
    }

    ngOnInit() {}

    doCreateChart(){
      let anoAtual = new Date().getFullYear();
      this._financeiroServico.doGetFinanceirosMes(anoAtual)
      .subscribe(
        (response) => {
          let mes = response.data[0];
          let rec = response.data[1];
          let des = response.data[2];

          console.warn(mes, rec, des);
          
          this.dataSource = {
            labels: mes,
            datasets: [
              {
                label: "Receitas",
                backgroundColor: "blue",
                data: rec
              },
              {
                label: "Despesas",
                backgroundColor: "Red",
                data: des
              }
            ]
          };          
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        }
      );      
    }
}
