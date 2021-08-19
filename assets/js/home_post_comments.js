// This class will be initialized  for every post in the page
// 1. when the page loads
// 2. when post is created via ajax request

class PostComment{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        console.log(this.newCommentForm);
        this.createComment(postId);

        let self = this;
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        let pself = this;
        
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            console.log("we are in comemnts");
            let self = this;
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pself.newCommentDom(data.data.comment);
                    $(`#posts-comments-${postId}`).prepend(newComment);
                    pself.deleteComment($(' .delete-comment-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(err){
                    console.log(err.resposeText);
                }
            });

        });
    }

    newCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
        <p>
            <small>
                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">x</a>
            </small>

            ${comment.content}
            <br>
            <small>${comment.user.name}</small>
        </p>
    </li>`);
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            //console.log("atline 56");
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function(err){
                    log.console(err.resposeText);
                }
            });
        });
    }
    
}
// {

// let createComment = function(){
//     let newCommentForm = $('#post-comment-form');
//     newCommentForm.submit(function(e){
//         e.preventDefault();

//         $.ajax({
//             type: 'post',
//             url: '/comments/create',
//             data: newCommentForm.serialize(),
//             success: function(data){
//                 console.log(data);
//                 let newComment = newCommentDom(data.data.comment);
//                 $(`#posts-comments-${data.data.comment.post}`).prepend(newComment);
//             }, error: function(err){
//                 console.log(err.resposeText);
//             }
//         });
//     });
// }

// let newCommentDom = function(comment){
//     return $(`<li id="comment-${comment._id}">
//     <p>
//         <small>
//             <a href="/comments/destroy/${comment._id}">x</a>
//         </small>
    
//         ${comment.content}
//         <br>
//         <small>${comment.user.name}</small>
//     </p>
// </li>`);
// }

// createComment();
// }
