import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})

export class PollComponent implements OnInit {


  public showWellcome = true;
  public loggedIn = true;
  public showIdentify = false;
  public showParkingQuestion = false;
  public showEnd = false;
  public priceOptions = [20, 25, 30, 35, 40, 45]
  public clientId = '';
  public selectedPrice = '';
  public showIdentify2 = false;
public  validClientId=false;

  public showStartButton = false;
  public visibleQuestion = 1;
  public pollResponse = [];
  public poll = {id: null, questions: []}

  constructor(public pollService: PollService) { 

  }

  ngOnInit(){
     let that = this;
     this.pollService.getPoll(2).then(function(poll) { that.setPoll(poll) });
  }

  setPoll(poll) {
    
    this.poll = poll
    this.showStartButton = true;
    
  }

  showIdentifyPage() {
    this.showWellcome = false;
    this.showIdentify = true;
    this.showParkingQuestion = false;
    this.showEnd = false;
  }

  showParkingQuestionPage() {
    this.showWellcome = false;
    this.showIdentify = false;
    this.showParkingQuestion = true;
    this.showEnd = false;
  }

  showEndPage() {
    this.showWellcome = false;
    this.showIdentify = false;
    this.showParkingQuestion = false;
    this.endPoll();
    //this.showEnd = true;
    console.log('Mostramos end')
  }

  onKey(event: any) {
    const id = event.target.value;
    this.clientId=id;
    this.validClientId=true;
  }

  onItemChange(value) {
    console.log('-------')
    console.log(value)
    this.selectedPrice = value
  }

  endPoll() {
  let that = this;
  const pollAnswers = {
    id: this.poll.id,
    clientId: this.clientId,
    price: this.selectedPrice
  }

  this.pollService.createPollAnswers(pollAnswers)
    .then(function(res) { 
      console.log(res)
      if (res) {
        that.showEnd = true;
        that.showWellcome = false;
      }
    });
  }


  nextQuestion(answerId){
  /*
    this.pollResponse.push(answerId)
    if (this.visibleQuestion < this.poll.questions.length) {
      this.visibleQuestion += 1;
    } else {
      this.endPoll();
    }*/
  }
}
