/**
 * Created by Administrator on 2016/5/17.
 */
//获取发布模块类型
var lastTimestamp;
var tableTitle;
var hasUpdateFailAlert = true;
function updateTableArea(json){
    var typeData = json.voteList;
    $("#tableArea").empty();
    $("#tableArea").append(tableTitle);
    $.each(typeData, function(i, value) {
        var tbBody = "";
        tbBody += "<tr class='" + value.name + "'>";
        tbBody += "<td class='name'>" + value.name + "</td>";
        tbBody += "<td class='team1'>" + value.team1 + "</td>";
        tbBody += "<td class='team2'>" + value.team2 + "</td>";
        tbBody += "<td class='condition'>" + value.condition + "</td>";
        tbBody += "<td class='vote'>" + value.vote + "</td>";
        tbBody += "</tr>";
        $("#tableArea").append(tbBody);
    });
}
function getModuleInfo() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "GetVoteAction",
        success: function(json) {
            if (json.lastTimestamp == lastTimestamp){
                return;
            }
            updateTableArea(json);
            lastTimestamp = json.lastTimestamp;
            hasUpdateFailAlert= true;
        },
        error: function(json) {
            if (hasUpdateFailAlert==true) {
                $.alert({
                    title: '错误',
                    content: '连接服务器出错',
                    confirm: function () {
                        hasUpdateFailAlert= true;
                        return;
                    }
                });
                hasUpdateFailAlert= false;
            }
        }
    });
}

$(document).ready(function(){
    $("#admin").hide();
    tableTitle = $("#tableTitle").html();
    var args = new Object();
    args = GetUrlParms();
    if(args["admin"]!=undefined) {
        var value1 = args["admin"] ;
        if (value1 == "true"){
            $("#admin").show();
        }
    }
    getModuleInfo()
    setInterval(getModuleInfo, 1000);
});

$("#sub").click(function(){
    $.ajax({
        cache: true,
        type: "POST",
        url:"SetVoteAction",
        data:$("#adminform").serialize(),
        async: false,
        error: function(request) {
            $.alert({
                title: '错误',
                content: '提交失败',
                confirm: function(){

                }
            });

        },
        success: function(json) {
            updateTableArea(json);
        }
    });
    return false;

});

$("#btnclean").click(function(){
    $.confirm({
        title: '警告',
        content: '这将清空所有数据，是否继续？',
        confirmButton: '确定',
        cancelButton: '取消',
        confirm: function(){
            $.ajax({
                cache: true,
                type: "POST",
                url:"CleanVoteAction",
                data: {},
                async: false,
                error: function(request) {
                    $.alert({
                        title: '错误',
                        content: '清空失败',
                        confirm: function(){
                            return;
                        }
                    });
                },
                success: function(json) {
                    updateTableArea(json);
                }
            });
        },
        cancel: function(){
            console.log('the user clicked cancel');
        }
    });
    //if(confirm("这将清空所有数据，是否继续？")){
    //    $.ajax({
    //        cache: true,
    //        type: "POST",
    //        url:"CleanVoteAction",
    //        data: {},
    //        async: false,
    //        error: function(request) {
    //            alert("Connection error");
    //        },
    //        success: function(json) {
    //            updateTableArea(json);
    //        }
    //    });
    //}

    return false;

});

function GetUrlParms()
{
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split("&");//在逗号处断开
    for(var   i=0;i<pairs.length;i++)
    {
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1)   continue;//如果没有找到就跳过
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=unescape(value);//存为属性
    }
    return args;
}