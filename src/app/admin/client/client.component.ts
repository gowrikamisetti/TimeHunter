import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientList: any = []
  clientSubmit = false;
  loading = true;

  //client Form
  clientForm = new FormGroup({
    client: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient, private clientService: ClientService) { }

  //getting clients data
  async ngOnInit(): Promise<any> {
    const c = (await this.clientService.getClient()).toPromise()
    c.then((data) => {
      this.loading = false;
      this.clientList = data;
    })
  }

  //add clients to firebase
  addClient() {
    this.clientSubmit = true;
    if (this.clientForm.valid) {
      this.http.post('https://timehunter-cdaf8-default-rtdb.firebaseio.com/client.json', this.clientForm.value).subscribe(res => {
        this.ngOnInit()
        this.clientSubmit = false;
        this.loading = false;
        this.clientForm.reset()
      })
    }
  }

  //delete Client
  deleteClient(client: any) {
    this.http.delete(`https://timehunter-cdaf8-default-rtdb.firebaseio.com/client/${client.id}.json`).subscribe(res => {
      this.ngOnInit()

    })
  }

}
