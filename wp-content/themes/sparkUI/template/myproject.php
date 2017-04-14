<?php
wp_enqueue_style('fep-style');
wp_enqueue_script('fep-script');
wp_enqueue_media();

$current_user = wp_get_current_user();
$status = isset($_GET['fep_type']) ? $_GET['fep_type'] : 'publish';
$paged = isset($_GET['fep_page']) ? $_GET['fep_page'] : 1;
$per_page = (isset($fep_misc['posts_per_page']) && is_numeric($fep_misc['posts_per_page'])) ? $fep_misc['posts_per_page'] : 10;//每页显示文章数
$author_posts = new WP_Query(array('posts_per_page' => -1, 'paged' => $paged, 'orderby' => 'DESC', 'author' => $current_user->ID, 'post_status' => $status,'cat'=>13,14,17 ));
$old_exist = ($paged * $per_page) < $author_posts->found_posts;
$new_exist = $paged > 1;
?>

<style type="text/css">
    #close-icon{
        position: absolute;
        display: block;
        top: 6px;
        right: 20px;
    }
</style>

<script type="text/javascript">
    //鼠标划过事件
    $(".thumbnail").mouseover(function () {
        //$(this).addClass("border");
        //显示删除叉
        $(this).find("#close-icon").css("display", "block");
    });
    $(".thumbnail").mouseout(function () {
        //$(this).removeClass("border");
        //隐藏删除叉
        $(this).find("#close-icon").css("display", "none");

    });
</script>

<ul id="leftTab" class="nav nav-pills" style="height: 42px">
    <li class="active" style="margin-left: 16px"><a href="#my-publish" >我发布的</a></li>
</ul>

<div id="rightTabContent" class="tab-content" >
    <div class="tab-pane fade in active" id="my-publish" style="padding-top: 40px;">
        <div style="height: 1px;background-color: lightgray;"></div><br>
        <?php if (!$author_posts->have_posts()): ?>
            <?php _e('还没有发布过项目.', 'frontend-publishing'); ?>
        <?php else: ?>
            <p style="margin-left: 10px;font-size: 15px"><?php printf(__('我已发布 %s 个项目.', 'frontend-publishing'), $author_posts->found_posts); ?></p>
        <?php endif; ?>
        <ul class="list-group">
            <?php
            while ($author_posts->have_posts()) : $author_posts->the_post();
            $postid = get_the_ID();
            ?>
            <li style="list-style-type: none;">
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class="thumbnail" style="height: 270px">
                        <span class="fa fa-trash-o fa-lg" id="close-icon"></span> <!--删除文章-->
                        <?php
                        if ( has_post_thumbnail() ) { ?>
                            <?php the_post_thumbnail(array(220,150)); ?> <?php } else {?>
                            <img src="<?php bloginfo('template_url'); ?>/img/thumbnail.png" alt="封面" height="150"/>
                        <?php } ?>
                        <div style="height: 1px;background-color: lightgray"></div>
                        <div class="caption">
                            <div style="height: 50px;font-size: 20px;color: black;">
                                <b><a href="<?php the_permalink(); ?>" style="color: black"><?php the_title(); ?></a></b></div>
                            <div style="display: inline;">
                                <span class="fa fa-user-o pull-left" style="font-size: 12px;color: gray">&nbsp;<?php the_author(); ?></span><span class="fa fa-bookmark-o pull-right" style="font-size: 12px;color: gray"> <?php the_category(', ') ?></span>
                            </div><br>
                            <div style="display: inline;">
                                <span class="fa fa-clock-o pull-left" style="font-size: 12px;color: gray"> <?php the_time('Y年n月j日') ?> </span><span class="fa fa-comments-o pull-right" style="font-size: 12px;color: gray"> <?php comments_popup_link('0 条', '1 条', '% 条', '', '评论已关闭'); ?></span><span class="fa fa-eye pull-right" style="font-size: 12px;color: gray"> <?php echo getProjectViews(get_the_ID()); ?></span>
                                <br>

                            </div>
                        </div>
                    </div>

                </div>
            </li>
            <?php endwhile; ?>
</div>





        <?php wp_nonce_field('fepnonce_delete_action', 'fepnonce_delete'); ?>
        <!--<div class="fep-nav">
            <?php /*if ($new_exist): */?><!--
                <a class="fep-nav-link fep-nav-link-left" href="?fep_type=<?/*= $status */?>&fep_page=<?/*= ($paged - 1) */?>">
                    &#10094; <?php /*_e('Newer Posts', 'frontend-publishing'); */?></a>
            <?php /*endif; */?>
            <?php /*if ($old_exist): */?>
                <a class="fep-nav-link fep-nav-link-right"
                   href="?fep_type=<?/*= $status */?>&fep_page=<?/*= ($paged + 1) */?>"><?php /*_e('更多项目', 'frontend-publishing'); */?>
                    &#10095;</a>
            --><?php /*endif; */?>
           <!-- <div style="clear:both;"></div>
        </div>-->
        <?php wp_reset_query();
        wp_reset_postdata(); ?>
    </div>
