/**
 * Created by Administrator on 2016/5/17.
 */
//获取发布模块类型
var lastVoteTimestamp;
var lastDanMuTimestamp;
var updatingDanMu=false;
var updatingVote=false;
var tableTitle;
var hasUpdateFailAlert = true;
function updateDanMuList(json,needEmpty){
    var typeData = json.danMuList;
    if (needEmpty)
        $("#danMuList").empty();
    $.each(typeData, function(i, value) {
        var tbBody = "";
        tbBody += "<li class='list-group-item danMuli'>"+ ""+ value.time +"~"+ value.sender+" : "+value.message + "</li>";
        $("#danMuList").append(tbBody);
    });
    $("#scrollbar1").getNiceScroll().resize();
    //$("#scrollbar1").setAttribute("scrollTop",$("#scrollbar1").getAttribute("scrollHeight"));
    $("#scrollbar1").getNiceScroll(0).doScrollTop(0);
    $("#scrollbar1").getNiceScroll(0).doScrollTop($("#scrollbar1").prop("scrollHeight")-$("#scrollbar1").height());
}
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
function getDanMu() {
    if (updatingDanMu)
        return;
    updatingDanMu = true;
    danMulength = $( "li.danMuli" ).get().length;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "GetDanMuAction",
        success: function(json) {
            updatingDanMu = false;
            if (json.lastTimestamp == lastDanMuTimestamp){
                return;
            }
            updateDanMuList(json,true);
            lastDanMuTimestamp = json.lastTimestamp;
            hasUpdateFailAlert= true;
        },
        error: function(json) {
            console.error(json)
            if (!hasUpdateFailAlert) {
                $.alert({
                    title: '错误',
                    content: '连接服务器出错',
                    confirm: function () {
                        hasUpdateFailAlert= false;
                        updatingDanMu=false;
                        return;
                    }
                });
                hasUpdateFailAlert= true;
            }
        }
    });
}
function getVoteInfo() {
    if (updatingVote)
        return;
    updatingVote = true;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "GetVoteAction",
        success: function(json) {
            updatingVote = false;
            if (json.lastTimestamp == lastVoteTimestamp){
                return;
            }
            updateTableArea(json);
            lastVoteTimestamp = json.lastTimestamp;
            hasUpdateFailAlert= true;
        },
        error: function(json) {
            if (!hasUpdateFailAlert) {
                $.alert({
                    title: '错误',
                    content: '连接服务器出错',
                    confirm: function () {
                        hasUpdateFailAlert= false;
                        updatingVote = false;
                        return;
                    }
                });
                hasUpdateFailAlert= true;

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
    $("#scrollbar1").niceScroll('#danMuList',{
        cursorcolor:"#E62020",
        cursoropacitymax:1,
        touchbehavior:false,
        cursorwidth:"10px",
        cursorborder:"0",
        cursorborderradius:"5px",
        autohidemode: false
    });
    getVoteInfo()
    setInterval(getVoteInfo, 1000);
    getDanMu()
    setInterval(getDanMu, 1000);
});

$(window).resize(function(){
    $("#scrollbar1").getNiceScroll().resize();
})

$("#subDanMu").click(function(){
    $.ajax({
        cache: true,
        type: "POST",
        url:"AddDanMuAction",
        data:$("#danMuform").serialize()+"&danMu.time="+getNowFormatDate(),
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
            updateDanMuList(json,true);
        }
    });
    return false;

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
            $.ajax({
                cache: true,
                type: "POST",
                url:"CleanDanMuAction",
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
                    updateDanMuList(json,true);
                }
            });
        },
        cancel: function(){
            console.log('the user clicked cancel');
        }
    });

    return false;

});

function GetUrlParms() {
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
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    //     + " " + date.getHours() + seperator2 + date.getMinutes()
    //     + seperator2 + date.getSeconds();
    var currentdate = date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}