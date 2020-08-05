import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {
  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;

  comment_id;
  republic = JSON.parse(localStorage.getItem('republica'));
  republic_id = this.republic.id;


  comments = [];

  constructor( public formbuilder: FormBuilder, public commentService: CommentService ) { 
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() {

    this.showComments();
  }

  sendComment(form){
    form.value.republic_id = this.republic_id;
    form.value.username= localStorage.getItem('username');
    //form.value.user_id= localStorage.getItem('user_id');
    console.log(form.value);
    this.editMode = false;
    this.commentService.createComment(form.value).subscribe(
      (res) => { 
        console.log(res);
        this.showComments();
      }, 
      (err) => { 
        console.log(err); 
      } 
    )
  }

  showComments(){
    this.commentService.listComment(this.republic_id).subscribe(
      (res) => { 
        this.comments = res.comments; 
      }, (err) => 
      { 
        console.log(err); 
      } 
    )
  }

  sendEditComment(form){
    this.commentService.editComment(this.comment_id, form.value).subscribe(
      (res) => { 
        console.log(res);
        this.showComments();
      }, (err) => 
      { 
        console.log(err); 
      } 
    )
    
    console.log(form);
    console.log(form.value);
  }

  toggleEdit(id){
    this.editMode = true;
    this.comment_id = id;
    console.log(id)
  }

  deleteComment(id){
    this.commentService.deleteComment(id).subscribe(
      (res) => { 
        console.log(res);
        this.showComments();
      }, (err) => { 
        console.log(err);
      } 
    )
    console.log('Mais que cancelado: ' + id);
  }

}
