<?php $current_user = wp_get_current_user();
      $user_description = get_user_meta($current_user->ID,'description',true);

?>

<?php
$admin_url=admin_url('admin-ajax.php');
?>
<!--<script type="text/javascript">

    function get_notice() {
        var get_contents = {
            action: "get_notice",
        };
        $.ajax({
            type: "POST",
            url: "<?php /*echo $admin_url;*/?>",
            data: get_contents,
            dataType: "json",
            beforeSend: function () {
            },
            success: function(data){
                alert(data.new_comments.length);
            },
            error: function() {
                alert("消息提醒 获取失败!");
            }
        });
    }

    $(function(){
        get_notice();
    });
</script>-->

<div class="col-md-3 col-sm-3 col-xs-3 right" id="col3">
    <div id="user-profile">
        <div id="avatar">
            <?php echo get_avatar($current_user->ID,100);?>
            <div class="change" id="setPhoto"><i class="fa fa-camera" aria-hidden="true"></i></div>
        </div>
        <div id="changeAvaDiv" style="display: none;margin-top: 20px;">
            <form class="form-horizontal" role="form" name="updateAva" enctype="multipart/form-data" method="post" action="<?php echo esc_url(self_admin_url('profile-process-avatar.php')); ?>">
                <a href="javascript:;" class="a-upload">修改头像<input type='file' name='simple-local-avatar'id='simple-local-avatar'/></a>
                <a href="javascript:;" class="a-upload">保存<input type='submit' class='btn btn-default' name='submit' value='保存'/></a>
                <input type="text" placeholder="文件名" id="aim" class="upload-filename"/>
            </form>
        </div>

        <script>
            window.onload = function(){
                var ms = document.getElementById("avatar");
                var add = document.getElementById("setPhoto");
                ms.onmouseover = function(){
                    add.style.display = "block";
                };
                ms.onmouseout = function(){
                    add.style.display = "none";
                };
            };
        </script>
        <script>
            var Avatar = document.getElementById("avatar");
            Avatar.onclick = preChangeAvatar;
            function preChangeAvatar() {
                var changeAva = document.getElementById('changeAvaDiv');
                if(changeAva.style.display == "none"){
                    changeAva.style.display = "block";}
                else{
                    changeAva.style.display = "none";}
            }
        </script>
        <script type="text/javascript">
            var file = $('#simple-local-avatar'),
                aim = $('#aim');
            file.on('change', function( e ){
                //e.currentTarget.files 是一个数组，如果支持多个文件，则需要遍历
                var name = e.currentTarget.files[0].name;
                aim.val( name );
            });
        </script>
        <p style="font-size: large;margin-top: 20px"><?php echo $current_user->data->display_name;?></p>
        <p style="margin-top: 10px;color: gray"><?php echo $user_description;?></p>
    </div>
    <ul id="personal_nav" class="nav nav-pills nav-stacked">
        <li id="notification">
            <img src="<?php bloginfo("template_url")?>/img/notification.png">
            <span>
                <a href="<?php echo esc_url(add_query_arg(array('tab'=>'notification')))?>">消息提醒</a>
            </span>
        </li>
        <li id="wiki">
            <img src="<?php bloginfo("template_url")?>/img/wiki.png">
            <span><a href="<?php echo esc_url(add_query_arg(array('tab'=>'wiki')))?>">我的wiki</a></span>
        </li>
        <li class="active" id="qa">
            <img src="<?php bloginfo("template_url")?>/img/qa.png">
            <span><a href="<?php echo esc_url(add_query_arg(array('tab'=>'qa')))?>">我的问答</a></span>
        </li>
        <li id="project">
            <img src="<?php bloginfo("template_url")?>/img/project.png">
            <span><a href="<?php echo esc_url(add_query_arg(array('tab'=>'project')))?>">我的项目</a></span>
        </li>
        <li id="profile">
            <img src="<?php bloginfo("template_url")?>/img/profile.png">
            <span><a href="<?php echo esc_url(add_query_arg(array('tab'=>'profile')))?>">个人资料</a></span>
        </li>
    </ul>
</div>
