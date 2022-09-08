import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-dashbord-client',
  templateUrl: './dashbord-client.component.html',
  styleUrls: ['./dashbord-client.component.css']
})
export class DashbordClientComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  docDefinition: any;
  url: any

  clientdata: any;
  dataArray: any;
  messageErr: any;
  countAllClientt: any;

  constructor(private usersService: UsersService, private route:Router) {
    this.clientdata = JSON.parse(sessionStorage.getItem('clientdata')!);
    console.log(this.clientdata)

    this.countAllClientt = JSON.parse(sessionStorage.getItem('countAllClientt')!);
  }

  ngOnInit(): void {
    this.usersService.countAllClient(this.clientdata.id).subscribe(data => {

      console.log(data)
      sessionStorage.setItem('countAllClientt', JSON.stringify(data));

      this.dataArray = data, (err: HttpErrorResponse) => {
        console.log(err)
        this.messageErr = "We dont't found this user in our database"
      }
      console.log(this.dataArray)
    })

  }

  async getPdf() {

    this.docDefinition = {
      /*header: 'Resume',*/
      content: [

        {
          text: 'Client Statistique System',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },


        {
          text: 'Client Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: "Full Name : " + this.clientdata.lastname + " " + this.clientdata.firstname,
                fontSize: 20,
                bold: true,

                decoration: 'underline',
                color: 'skyblue'
              },

            ],
            [

            ]
          ]
        },
        {
          text: 'Statistique Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [


              { text: "Not Active Missions : " + this.countAllClientt.notactivemissions },

              {
                text: "Active Missions : " + this.countAllClientt.activemissions,
                bold: true
              },
              {

                text: "Ended Missions  : " + this.countAllClientt.endedmissions,

              },
              { text: "All Missions : " + this.countAllClientt.allmissions },



            ],
            [

            ]
          ]
        },



      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    pdfMake.createPdf(this.docDefinition).open();
  }
  logout(){

    this.usersService.logout();
    this.route.navigate(['/login']);
   
  }
}
