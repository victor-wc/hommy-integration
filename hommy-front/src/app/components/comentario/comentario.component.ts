import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
})
export class ComentarioComponent implements OnInit {

  checkUser(user){
    if(!localStorage.getItem('username')){
      localStorage.setItem('username', '');
    }
    return user == localStorage.getItem('username');
  }

  @Input() comentario;
  @Output() editClicked = new EventEmitter<number>();
  @Output() trashClicked = new EventEmitter<number>();

  constructor(public commentService: CommentService ) { }

  edit(id) {
    this.editClicked.emit(id);
  }

  deleteComment(id){
    this.trashClicked.emit(id);
  }

  ngOnInit() {}
}
