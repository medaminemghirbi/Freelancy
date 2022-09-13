import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
/*import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import * as pdfMake from "pdfmake/build/pdfmake";*/
import * as pdfMake from'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-generatecv',
  templateUrl: './generatecv.component.html',
  styleUrls: ['./generatecv.component.css']
})
export class GeneratecvComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  messageErr = ''
  dataArray: any;
  dataArrayy: any;
  dataArrayyy: any;
  dataArrayyyy: any;
  id: any;
  logged_in: boolean = false;
  role: string = '';
  arrayData: any[] = []
  colorsBootstrap = ["success", "info", "warning", "danger", "primary", "secondary", "dark", "light",]
  docDefinition: any;
  freelancerdata:any
  freelancereducation:any
  freelancerskills:any
  freelancerexperience:any
  url:any
  constructor(private route:Router,private activatedRoute: ActivatedRoute, private usersService: UsersService) {
    this.logged_in = JSON.parse(sessionStorage.getItem('logged_in')!);
    console.log(this.logged_in)
    this.freelancerexperience = JSON.parse( sessionStorage.getItem('freelancerexperience')!);
   this.freelancerdata = JSON.parse( sessionStorage.getItem('freelancerdata') !);
   this.freelancereducation = JSON.parse( sessionStorage.getItem('freelancereducation') !);
   this.freelancerskills = JSON.parse( sessionStorage.getItem('freelancerskills')!);
   this.url = this.freelancerdata.user_image_url
    console.log(this.freelancerdata)
   
   console.log(name)
    this.role = JSON.parse(sessionStorage.getItem('role')!);
    console.log(this.role)

  } 
  ngOnInit(): void {

    this.usersService.freelancerhomedata(this.activatedRoute.snapshot.params['id']).subscribe(data => {

      console.log(data)
      this.dataArray = data,
        (err: HttpErrorResponse) => {
          console.log(err)
          this.messageErr = "We dont't found this user in our database"
        }
      //console.log(this.dataArray)
    })

    this.usersService.getfreelancereducation(this.activatedRoute.snapshot.params['id']).subscribe(data => {

      console.log(data)
      sessionStorage.setItem( 'freelancereducation', JSON.stringify( data ) );
      this.dataArrayy = data,
        (err: HttpErrorResponse) => {
          console.log(err)
          this.messageErr = "We dont't found this user in our database"
        }
      //console.log(this.dataArray)
    })

    this.usersService.getfreelancerexperiance(this.activatedRoute.snapshot.params['id']).subscribe(data => {

      console.log(data)
      sessionStorage.setItem( 'freelancerexperience', JSON.stringify( data ) );
      this.dataArrayyy = data,
        (err: HttpErrorResponse) => {
          console.log(err)
          this.messageErr = "We dont't found this user in our database"
        }
      //console.log(this.dataArray)
    })

    this.usersService.getfreelancerlanguage(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      console.log(data)
      let i = 0
      sessionStorage.setItem( 'freelancerskills', JSON.stringify( data ) );

      while (i < data.length) {
        this.arrayData.push({
          "id": data[i].id,
          "name": data[i].language.name,
          "languagerate": data[i].languagerate,
          "color": this.colorsBootstrap[i]
        });
        
        i++

      }
      
      this.dataArrayyyy = this.arrayData, (err: HttpErrorResponse) => {
        console.log(err)
        this.messageErr = "We dont't found this user in our database"
      }
      //console.log(this.dataArray)
    })

  }

 /* public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      window.print
      PDF.save('angular-demo.pdf');
    });
  }*/
  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
  async getPdf() {
    
  this.docDefinition = {
    /*header: 'Resume',*/
    content: [
  
      {
        text: 'Freelancy CV System',
        fontSize: 16,
        alignment: 'center',
        color: '#047886'
      },
      {
        image: await this.getBase64ImageFromURL(
         this.url
         
        ),
        width: 150,
        height: 150

        
      } ,
      {
        text: this.freelancerdata.lastname+" "+ this.freelancerdata.firstname,
        fontSize: 20,
        bold: true,
       
        decoration: 'underline',
        color: 'skyblue'
      },
      {
        text: 'Social Media  Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              text:"Github : " +this.freelancerdata.github,
              bold: true
            },
            { text:"Facebook  : " + this.freelancerdata.facebook},
            { text:"Instagram : " + this.freelancerdata.instagram },
            { text:"LinkedIn : " + this.freelancerdata.linkedin }
          ],
          [
    
          ]
        ]
      },
      {
        text: 'Freelancer Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              text:"Full Name : " +this.freelancerdata.lastname+" "+ this.freelancerdata.firstname,
              bold: true
            },
            { text:"Freelancer Adress : " + this.freelancerdata.adresse},
            { text:"Date Of Birth : " + this.freelancerdata.birthday },
            { text:"Freelancer Description : " + this.freelancerdata.description }
          ],
          [
    
          ]
        ]
      },
      {
        text: 'Education Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              
              text:"School  : " +this.freelancereducation.map(function(a:any) {return a.ecole;}),
              bold: true
            },
            
        
            { text:"Start Date : " + this.freelancereducation.map(function(a:any) {return a.dateDebut;})},
            { text:"End Date : " +     this.freelancereducation.map(function(a:any) {return a.dateFin;})},

          ],
          [
    
          ]
        ]
      },
      {
        text: 'Experience  Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              
              text:"Society  : " +this.freelancerexperience.map(function(a:any) {return a.entreprise;}),
              bold: true
            },
            
            { text:"JobType : " +     this.freelancerexperience.map(function(a:any) {return a.jobType;})},
            { text:"Start Date : " + this.freelancerexperience.map(function(a:any) {return a.dateDebut;})},
            { text:"End Date : " +     this.freelancerexperience.map(function(a:any) {return a.dateFin;})},
            { text:"Description : " +     this.freelancerexperience.map(function(a:any) {return a.description;})},
          ],
          [
    
          ]
        ]
      },
      
      {
       text: 'Skills Details',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            [ 'skills',  ' %'],
            [this.freelancerskills.map(function(a:any) {return a.language.name;}),this.freelancerskills.map(function(a:any) {return a.languagerate;})]
   
          ]
        }
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