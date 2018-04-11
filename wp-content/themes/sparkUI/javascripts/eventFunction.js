/**
 * Created by zhangxue on 2018/4/6.
 */

//加入group
function join_the_group($group_id, $admin_url) {
    //ajax
    var data = {
        action: 'join_the_group',
        group_id: $group_id
    };
    $.ajax({
        //async: false,    //否则永远返回false
        type: "POST",
        url: $admin_url,
        data: data,
        dataType: "text",
        success: function (response) {
            if (response.trim() == 'freejoin') {
                // var rongData = {
                //     action: 'rongCloudJoinGroup',
                //     group_id: $group_id
                // };
                // $.ajax({
                //     type: "POST",
                //     url: $admin_url,
                //     data: rongData,
                //     dataType:"json",
                //     success: function (res) {},
                //     error:function (XMLHttpRequest, textStatus, errorThrown) {
                //         // 状态码
                //         console.log(XMLHttpRequest.status);
                //         // 状态
                //         console.log(XMLHttpRequest.readyState);
                //         // 错误信息
                //         console.log(errorThrown);
                //     }
                // });
                layer.msg("您已成功加入", {time: 2000, icon: 1});
                location.reload();
            } else {
                layer.msg("申请已发送,等待管理员审核", {time: 3000, icon: 1});
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息
            console.log(errorThrown);
        }
    });
}

//退群
function quit_the_group($group_id, $admin_url) {
    //ajax
    var data = {
        action: 'quit_the_group',
        group_id: $group_id
    };
    $.ajax({
        //async: false,    //否则永远返回false
        type: "POST",
        url: $admin_url,
        data: data,
        success: function () {
            // var rongData = {
            //     action: 'rongCloudQuitGroup',
            //     group_id: $group_id
            // };
            // $.ajax({
            //     type: "POST",
            //     url: $admin_url,
            //     data: rongData,
            //     dataType:"json",
            //     success: function (res) {
            //     },
            //     error:function (XMLHttpRequest, textStatus, errorThrown) {
            //         // 状态码
            //         console.log(XMLHttpRequest.status);
            //         // 状态
            //         console.log(XMLHttpRequest.readyState);
            //         // 错误信息
            //         console.log(errorThrown);
            //     }
            // });
            layer.msg("您已成功退群", {time: 2000, icon: 1});
            location.reload();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息
            console.log(errorThrown);
        }
    });
}

//验证加群
function verify_join_the_group($url) {
    layer.open({
        type: 2,
        title: "填写验证字段",
        content: $url,
        area: ['30%', '66%'],
        closeBtn: 1,
        shadeClose: true,
        shade: 0.5,
        end: function () {
        }
    })
}

//邀请入群
function invitation_the_group($url) {
    layer.open({
        type: 2,
        title: "邀请他人加入群组",
        content: $url,
        area: ['30%', '66%'],
        closeBtn: 1,
        shadeClose: true,
        shade: 0.5,
        end: function () {
        }
    })
}

//发私信
function send_private_message($url) {
    layer.open({
        type: 2,
        title: false,
        content: $url,
        area: ['60%', '66%'],
        closeBtn: 1,
        shadeClose: true,
        shade: 0.5,
        end: function () {
        }
    })
}


//联想查询
function autoComplete(response, tab, part) {
    var arr = response.split("|");
    arr.pop();
    var li = "";
    var ac_id = "#autocomplete-" + part;
    if (arr.length != 0) {
        $.each(arr, function (i, val) {
            li += "<li class='list-group-item'>" + val + "</li>";
        });
        $(ac_id + " ul").html(li);
        $(ac_id).slideDown('fast');
        //鼠标经过元素的背景颜色改变
        $(ac_id + " ul li").bind('mouseenter', function () {
            $(this).css({'background': '#e9e8e9'})
        });
        $(ac_id + " ul li").bind('mouseleave', function () {
            $(this).css({'background': 'transparent'})
        });
        $(ac_id + " ul li").bind('click', function () {
            $("#" + tab + "-" + part + "-input").val($(this).html());
            $(ac_id).slideUp('fast');
        });
    }
    else {
        $(ac_id).slideUp('fast');
    }
}
//添加到选择table
function addToChosen(tab, type, url) {

    var input_id = '#' + tab + '-' + type + '-input';
    var name = $(input_id).val();
    var data = {
        action: 'rbac_hasItem',
        part: type,
        word: name
    };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'text',
        success: function (response) {
            if (response.trim() == false) {  // 如果没有
                if (type == 'permission') {
                    layer.msg("无此权限", {time: 2000, icon: 2})
                } else if (type == 'user') {
                    layer.msg("无此用户", {time: 2000, icon: 2})
                } else {
                    layer.msg("无此角色", {time: 2000, icon: 2})
                }
            }
            else {
                //把下拉菜单关上,输入框清空
                $('#autocomplete-'+type).css('display','none');
                $(input_id).val('');
                //step1:执行逻辑是先加入一行,包括一个多选框和一个数据
                var tr = '<tr class="warning" >' + '<td id="hidden_id" style="display:none">' + response.trim() + '</td>' +
                    '<td>' + name + '</td>' +
                    '</tr>';
                $('#' + type + '-choose-table-border tbody:last').append(tr);    //添加数据
                var $tbr = $('#' + type + '-choose-table-border tbody tr:last');
                var $checkItemTd = $('<td><input type="checkbox" name="checkItem" checked/></td>');   //添加复选框
                $tbr.prepend($checkItemTd);
                $tbr.find('input').click(function (event) {
                    /*调整选中行的CSS样式*/
                    $(this).parent().parent().toggleClass('warning');
                    /*阻止向上冒泡，以防再次触发点击操作*/
                    event.stopPropagation();
                });
                /*点击每一行时也触发该行的选中操作*/
                // $tbr.click(function () {
                //     $(this).find('input').click();
                // });
                //step2:将事件绑定到刚刚添加的元素上
                var choose_table_id = '#' + type + '-choose-table-border';
                var show_table_id = '#' + type + '-info-table-border';
                addClickEvent(choose_table_id, type, show_table_id, url);
            }
        }
    })
}
//添加table中的data点击事件
function addClickEvent(choose_table_id, type, show_table_id, url) {
    $(choose_table_id + ' tbody tr td').bind('click', function () {
        var name = this.innerText;
        var data = {
            action: 'rbac_get_table_info',
            part: type,
            word: name
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            success: function (response) {
                var info = $(show_table_id + ' tbody tr');
                for (var i = 0; i < info.length; i++) {
                    var tmp = info[i].childNodes[3].innerText;
                    info[i].childNodes[3].innerText = response[i];
                }
            }
        })
    })
}

//在配置角色和权限页面将数据插入表格
function addToChosenList(tab, type, url) {
    var input_id = '#' + tab + '-' + type + '-input';
    var name = $(input_id).val();
    var data = {
        action: 'rbac_hasItem',
        part: type,
        word: name
    };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'text',
        success: function (response) {
            if (response.trim() == false) {  // 如果没有
                if (type == 'permission') {
                    layer.msg("无此权限", {time: 2000, icon: 2})
                } else if (type == 'user') {
                    layer.msg("无此用户", {time: 2000, icon: 2})
                } else {
                    layer.msg("无此角色", {time: 2000, icon: 2})
                }
            }
            else {
                $('#autocomplete-'+type).css('display','none');
                $(input_id).val('');
                //step1:在表头下面加入新的一行
                var data = {
                    action: 'rbac_get_list_info',
                    part: type,
                    word: name
                };
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
                    dataType: 'json',
                    success: function (res) {
                        var id = "#" + tab + "-table-border";
                        var info = $(id + ' thead tr th');
                        var tr_id = type + '_' + res[1];
                        var tr = '<tr id=' + tr_id + '>';
                        $(id + ' tbody').append(tr);
                        for (var i = 0; i < info.length - 1; i++) {
                            var td = '<td>' + res[i] + '</td>';
                            $(id + ' tbody tr:last').append(td);
                        }

                        var append = '<td>' +
                            '<button class="btn btn-link" onclick="layerConfirmConfig(' + '\'' + tab + '\',' + '\'' + type + '\',' + res[1] + ',\'' + url + '\')"><span class="glyphicon glyphicon-edit"></span></button>' +
                            '<button class="btn btn-link" onclick="layerConfirmDelete(' + '\'' + type + '\',' + res[1] + ',\'' + url + '\')"><span class="glyphicon glyphicon-trash"></span></button>' +
                            '</td></tr>';
                        $(id + ' tbody tr:last').append(append);

                        //添加修改按钮
                        // $(id+' tbody tr:last')[0].childNodes[0].innerHTML +='<span class="glyphicon glyphicon-edit" onclick="editName()"></span>';
                        // $(id+' tbody tr:last')[0].childNodes[2].innerHTML += '<span class="glyphicon glyphicon-edit" onclick="editPermission()"></span>';
                        // $(id+' tbody tr:last')[0].childNodes[4].innerHTML += '<span class="glyphicon glyphicon-edit" onclick="editIllustration()"></span>';

                    }
                })
            }
        }
    })
}

//用输入框替换表格内容,达到修改的目的
function layerConfirmConfig(tab, type, id, url) {
    var tr_id = type + "_" + id;
    var b = $("tr[id='" + tr_id + "']")[0].childNodes; //td的list
    var tmp = b;
    //设置css
    if (type == 'role') {
        $("tr[id='" + tr_id + "']>td:nth-child(1)").css('width', '100px');
    } else {
        $("tr[id='" + tr_id + "']>td:nth-child(1)").css('width', '150px');
    }
    //用输入框替换内容
    if (b[0].children.length === 0) {
        b[0].innerHTML = "<input type='text' value='" + b[0].innerText + "' style='width: 100%'/>";
    }
    if (b[4].children.length === 0) {
        b[4].innerHTML = "<input type='text' value='" + b[4].innerText + "' style='width: 100%'/>";
    }
    if (type == 'role') {
        b[2].innerHTML = '<button class="btn btn-green" id="btn-config-' + id + '" onclick="deletePermission(' + '\'' + tab + '\',' + '\'' + type + '\',' + id + ',\'' + url + '\')">配置权限</button>';
    } else {
        b[2].innerHTML = '<button class="btn btn-green" id="btn-config-' + id + '" onclick="deletePermission(' + '\'' + tab + '\',' + '\'' + type + '\',' + id + ',\'' + url + '\')">配置角色</button>';
    }

    b[5].innerHTML = '<button class="btn btn-link" onclick="saveConfig(' + '\'' + tab + '\',' + '\'' + type + '\',' + id + ',\'' + url + '\')"><span class="glyphicon glyphicon-floppy-disk"></span></button>' +
        '<button class="btn btn-link" onclick="cancelConfig(' + '\'' + tab + '\',' + '\'' + type + '\',' + id + ',\'' + url + '\')"><span class="glyphicon glyphicon-remove-sign"></span></button>';
}

//保存名称和说明的更改
function saveConfig(tab, type, id, url) {
    var tr_id = type + "_" + id;
    var b = $("tr[id='" + tr_id + "']")[0].childNodes; //td的list
    var td_name = b[0].children[0].value; //名称
    var td_ill = b[4].children[0].value; //说明

    var data = {
        action: 'save_config',
        part: type,
        id: id,
        name: td_name,
        ill: td_ill
    };
    $.ajax({
        url: url,
        type: "post",
        data: data,
        dataType: "json",
        success: function (res) {
            var tmp_id = "#" + type + "_" + res[1];
            $(tmp_id).remove();
            var id = "#" + tab + "-table-border";
            var info = $(id + ' thead tr th');
            var tr_id = type + '_' + res[1];
            var tr = '<tr id=' + tr_id + '>';
            $(id + ' tbody').append(tr);
            for (var i = 0; i < info.length - 1; i++) {
                var td = '<td>' + res[i] + '</td>';
                $(id + ' tbody tr:last').append(td);
            }
            var append = '<td>' +
                '<button class="btn btn-link" onclick="layerConfirmConfig(' + '\'' + tab + '\',' + '\'' + type + '\',' + res[1] + ',\'' + url + '\')"><span class="glyphicon glyphicon-edit"></span></button>' +
                '<button class="btn btn-link" onclick="layerConfirmDelete(' + '\'' + type + '\',' + res[1] + ',\'' + url + '\')"><span class="glyphicon glyphicon-trash"></span></button>' +
                '</td></tr>';
            $(id + ' tbody tr:last').append(append);
        }
    });
}

//撤销更改
function cancelConfig(tab, type, id, url) {
    var data = {
        action: 'cancel_config',
        part: type,
        id: id
    };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        success: function (res) {
            var tmp_id = "#" + type + "_" + res[1];
            $(tmp_id).remove();
            var id = "#" + tab + "-table-border";
            var info = $(id + ' thead tr th');
            var tr_id = type + '_' + res[1];
            var tr = '<tr id=' + tr_id + '>';
            $(id + ' tbody').append(tr);
            for (var i = 0; i < info.length - 1; i++) {
                var td = '<td>' + res[i] + '</td>';
                $(id + ' tbody tr:last').append(td);
            }
            var append = '<td>' +
                '<button class="btn btn-link" onclick="layerConfirmConfig(' + '\'' + tab + '\',' + '\'' + type + '\',' + res[1] + ',\'' + url + '\')"><span class="glyphicon glyphicon-edit"></span></button>' +
                '<button class="btn btn-link" onclick="layerConfirmDelete(' + '\'' + type + '\',' + res[1] + ',\'' + url + '\')"><span class="glyphicon glyphicon-trash"></span></button>' +
                '</td></tr>';
            $(id + ' tbody tr:last').append(append);
        }
    })
}

//点击弹出配置窗口
function deletePermission(tab, type, id, url) {
    var nodes = $('#btn-config-' + id)[0];
    if (nodes.innerText == '配置权限') {
        var data = {
            action: 'get_config_url',
            part: 'permission'
        };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'text',
            success: function (res) {
                layer.open({
                    type: 2,
                    title: "配置权限",
                    content: res + '&id=' + id,
                    area: ['60%', '66%'],
                    closeBtn: 1,
                    shadeClose: true,
                    shade: 0.5,
                    end: function () {
                        saveConfig(tab, type, id, url)
                    }
                })
            }
        });
    } else {
        var data = {
            action: 'get_config_url',
            part: 'role'
        };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'text',
            success: function (res) {
                layer.open({
                    type: 2,
                    title: "配置角色",
                    content: res+ '&id=' + id,
                    area: ['60%', '66%'],
                    closeBtn: 1,
                    shadeClose: true,
                    shade: 0.5,
                    end: function () {
                        saveConfig(tab, type, id, url)
                    }
                })
            }
        });
    }
}

//解除role和permission关联
function disassociate(rid,pid,url){   // 删除的是pid的权限与rid的角色的关联
    var data = {
        action: 'rp_disassociate',
        rid: rid,
        pid: pid
    };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'text',
        success: function (res) {
            //删除该行
            $('#tr_'+pid).remove()
        }
    });
}




//删除角色或权限的弹框
function layerConfirmDelete(type, id, url) {
    //获取用户数
    var data = {
        action: 'layer_confirm_delete',
        part: type,
        id: id
    };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'text',
        success: function (response) {
            var count = response.trim();
            if (type == 'role') {
                layer.confirm('确认删除该角色么？该角色已绑定' + count + '个用户', {btn: ['确认', '放弃']},
                    function () {              //确认
                        confirmDelete(type, id, url);
                        layer.msg('删除成功', {icon: 1});
                    }, function (index) {           //放弃
                        layer.close(index);
                    });
            } else {
                layer.confirm('确认删除该权限么？该权限已绑定' + count + '个角色', {btn: ['确认', '放弃']},
                    function () {              //确认
                        confirmDelete(type, id,url);
                        layer.msg('删除成功', {icon: 1});
                    }, function (index) {           //放弃
                        layer.close(index);
                        var tr_id = type + "_" + id;
                        $(tr_id).remove();
                    });
            }
        }
    });
}

//执行删除操作
function confirmDelete(type, id,url) {
    //执行删除操作,删除一个角色就是删除角色表中的数据和角色用户表、角色权限表中的关联
    var data = {
        action: 'confirm_delete',
        part: type,
        id: id
    };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'text',
        success: function (response) {
        }
    });

}