set_pie_chart(
    'chart_idol', 
    ['販売完了', '販売中', '販売未設定'], 
    [$("#idol_sold").val(), $("#idol_selling").val(), $("#idol_total").val() - $("#idol_sold").val() - $("#idol_selling").val()],
    'アイドルトークンに関する統計'
);

set_pie_chart(
    'chart_music', 
    ['販売完了', '販売中', '販売未設定'], 
    [$("#music_sold").val(), $("#music_selling").val(), $("#music_total").val() - $("#music_sold").val() - $("#music_selling").val()],
    '音楽トークンに関する統計'
);

set_pie_chart(
    'chart_art', 
    ['販売完了', '販売中', '販売未設定'], 
    [$("#art_sold").val(), $("#art_selling").val(), $("#art_total").val() - $("#art_sold").val() - $("#art_selling").val()],
    'アートトークンに関する統計'
);