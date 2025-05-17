import { expect, test } from "bun:test";
import { PlayerSchema } from "../schema";

const mockApiResponse: string = '{"uid":1322611509,"name":"gravitinos","updates":{"info_update_time":"1/19/2025, 2:49:14 PM","last_history_update":"3/20/2025, 2:55:39 PM","last_inserted_match":"3/18/2025, 1:18:05 PM","last_update_request":"3/20/2025, 2:55:35 PM"},"player":{"uid":1322611509,"level":"37","name":"gravitinos","icon":{"player_icon_id":"31031202","player_icon":"/players/heads/player_head_31031202.png"},"rank":{"rank":"Invalid level","image":null,"color":null},"team":{"club_team_id":"","club_team_mini_name":"","club_team_type":"0"},"info":{"completed_achievements":"88","login_os":"PC","rank_game_season":{"1001001":{"rank_game_id":1,"level":5,"rank_score":3414.2303453366185,"max_level":5,"max_rank_score":3435.513236595722,"update_time":1736479209,"win_count":19,"protect_score":3,"diff_score":-21.282891259103508},"1001002":{"rank_game_id":2,"level":4,"rank_score":3322.238912140294,"max_level":4,"max_rank_score":3350.3270446071765,"update_time":1739338268,"win_count":14,"protect_score":1,"diff_score":-22.103193693683806},"1001003":{"rank_game_id":3,"level":12,"rank_score":4088.759023267706,"max_level":12,"max_rank_score":4112.521761731498,"update_time":1742318981,"win_count":50,"protect_score":0,"diff_score":-23.762738463792175}}}},"isPrivate":false,"overall_stats":{"total_matches":30,"total_wins":20,"unranked":{"total_matches":3,"total_wins":2,"total_assists":1,"total_deaths":10,"total_kills":30,"total_time_played":"18m 22s","total_time_played_raw":1102.9046919345856,"total_mvp":0,"total_svp":0},"ranked":{"total_matches":27,"total_wins":18,"total_assists":183,"total_deaths":154,"total_kills":509,"total_time_played":"4h 47m 32s","total_time_played_raw":17252.567150115967,"total_mvp":6,"total_svp":1}},"match_history":[{"match_uid":"5513269_1746559392_1245017_11001_12","map_id":1245,"map_thumbnail":"/rivals/maps/map_1245.png","duration":938.9107959270477,"season":3,"winner_side":1,"mvp_uid":1306386082,"svp_uid":869397489,"match_time_stamp":1746560609,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":3},"player_performance":{"player_uid":1322611509,"hero_id":1024,"hero_name":"hela","hero_type":"/heroes/transformations/hela-headbig-0.webp","kills":19,"deaths":11,"assists":8,"is_win":{"score":0,"is_win":false},"disconnected":false,"camp":0,"score_change":-22.00917785123829,"level":11,"new_level":11,"new_score":4057.66278570009}},{"match_uid":"5513439_1746551508_1310028_11001_12","map_id":1310,"map_thumbnail":"/rivals/maps/map_1310.png","duration":624.0148808956146,"season":3,"winner_side":1,"mvp_uid":1275901897,"svp_uid":626046475,"match_time_stamp":1746552366,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":0,"1":2},"player_performance":{"player_uid":1322611509,"hero_id":1030,"hero_name":"moon knight","hero_type":"/heroes/transformations/moon-knight-headbig-0.webp","kills":12,"deaths":8,"assists":0,"is_win":{"score":0,"is_win":false},"disconnected":false,"camp":0,"score_change":-16.666950588423788,"level":11,"new_level":11,"new_score":4051.351901447504}},{"match_uid":"5517646_1746549066_1231040_11001_11","map_id":1231,"map_thumbnail":"/rivals/maps/map_1231.png","duration":473.201087474823,"season":3,"winner_side":1,"mvp_uid":563375663,"svp_uid":1521067992,"match_time_stamp":1746549802,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":0,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1045,"hero_name":"namor","hero_type":"/heroes/transformations/namor-headbig-0.webp","kills":7,"deaths":4,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":23.88333110438407,"level":12,"new_level":12,"new_score":4107.0661700670535}},{"match_uid":"5517530_1746546732_1245074_11001_11","map_id":1245,"map_thumbnail":"/rivals/maps/map_1245.png","duration":786.076000213623,"season":3,"winner_side":1,"mvp_uid":1673387696,"svp_uid":1434796393,"match_time_stamp":1746547785,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":1,"1":2},"player_performance":{"player_uid":1322611509,"hero_id":1053,"hero_name":"emma frost","hero_type":"/heroes/transformations/emma-frost-headbig-0.webp","kills":22,"deaths":2,"assists":3,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":23.362722370341544,"level":11,"new_level":12,"new_score":4103.325483635233}},{"match_uid":"5517860_1746484655_1310085_11001_11","map_id":1310,"map_thumbnail":"/rivals/maps/map_1310.png","duration":497.7840132713318,"season":3,"winner_side":1,"mvp_uid":550871181,"svp_uid":1265674908,"match_time_stamp":1746485392,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":0,"1":2},"player_performance":{"player_uid":1322611509,"hero_id":1035,"hero_name":"venom","hero_type":"/heroes/transformations/venom-headbig-0.webp","kills":14,"deaths":4,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":26.19301977836858,"level":11,"new_level":11,"new_score":4030.6099094430797}},{"match_uid":"5517707_1746483615_1292101_11001_11","map_id":1292,"map_thumbnail":"/rivals/maps/map_1292.png","duration":702.8343760967255,"season":3,"winner_side":1,"mvp_uid":1741080948,"svp_uid":1696802988,"match_time_stamp":1746484594,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":3},"player_performance":{"player_uid":1322611509,"hero_id":1024,"hero_name":"hela","hero_type":"/heroes/transformations/hela-headbig-0.webp","kills":31,"deaths":6,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":28.722887344769788,"level":10,"new_level":11,"new_score":4004.416889664711}},{"match_uid":"5513938_1746476974_1217285_11001_12","map_id":1217,"map_thumbnail":"/rivals/maps/map_1217.png","duration":242.7015151977539,"season":3,"winner_side":0,"mvp_uid":18173689,"svp_uid":212960960,"match_time_stamp":1746477306,"play_mode_id":0,"game_mode_id":1,"score_info":null,"player_performance":{"player_uid":1322611509,"hero_id":1036,"hero_name":"spider-man","hero_type":"/heroes/transformations/spider-man-headbig-0.webp","kills":7,"deaths":2,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":17.51134481373083,"level":1,"new_level":1,"new_score":3479.56556061838}},{"match_uid":"5518365_1745738213_1245400_11001_11","map_id":1245,"map_thumbnail":"/rivals/maps/map_1245.png","duration":923.9685115814209,"season":3,"winner_side":0,"mvp_uid":1068549252,"svp_uid":709206989,"match_time_stamp":1745739416,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":3,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1035,"hero_name":"venom","hero_type":"/heroes/transformations/venom-headbig-0.webp","kills":33,"deaths":7,"assists":6,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":33.62987954688606,"level":9,"new_level":9,"new_score":3846.5094591930815}},{"match_uid":"5518269_1745737412_1310426_11001_11","map_id":1310,"map_thumbnail":"/rivals/maps/map_1310.png","duration":518.5473129749298,"season":3,"winner_side":0,"mvp_uid":1322611509,"svp_uid":1876491292,"match_time_stamp":1745738172,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":0},"player_performance":{"player_uid":1322611509,"hero_id":1017,"hero_name":"human torch","hero_type":"/heroes/transformations/human-torch-headbig-0.webp","kills":24,"deaths":3,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":43.071675213859635,"level":8,"new_level":9,"new_score":3812.8795796461955}},{"match_uid":"5517453_1745696450_1101198_11001_11","map_id":1101,"map_thumbnail":"/rivals/maps/map_1101.png","duration":480.01505064964294,"season":3,"winner_side":1,"mvp_uid":1347839817,"svp_uid":1996518067,"match_time_stamp":1745697017,"play_mode_id":0,"game_mode_id":1,"score_info":null,"player_performance":{"player_uid":1322611509,"hero_id":1045,"hero_name":"namor","hero_type":"/heroes/transformations/namor-headbig-0.webp","kills":17,"deaths":3,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":42.76885717937557,"level":1,"new_level":1,"new_score":3520.01294438256}},{"match_uid":"5517658_1745693241_1292170_11001_11","map_id":1292,"map_thumbnail":"/rivals/maps/map_1292.png","duration":931.7588322162628,"season":3,"winner_side":0,"mvp_uid":524672413,"svp_uid":109080686,"match_time_stamp":1745694364,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1016,"hero_name":"loki","hero_type":"/heroes/transformations/loki-headbig-0.webp","kills":29,"deaths":7,"assists":18,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":28.255216872646997,"level":7,"new_level":7,"new_score":3689.049395919726}},{"match_uid":"5518007_1745690745_1231074_11001_11","map_id":1231,"map_thumbnail":"/rivals/maps/map_1231.png","duration":495.04544496536255,"season":3,"winner_side":1,"mvp_uid":1322611509,"svp_uid":1618470240,"match_time_stamp":1745691429,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":1,"1":2},"player_performance":{"player_uid":1322611509,"hero_id":1017,"hero_name":"human torch","hero_type":"/heroes/transformations/human-torch-headbig-0.webp","kills":25,"deaths":4,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":33.63678819714414,"level":7,"new_level":7,"new_score":3645.7375016746655}},{"match_uid":"5519052_1745290245_1310807_11001_11","map_id":1310,"map_thumbnail":"/rivals/maps/map_1310.png","duration":954.8636047840118,"season":3,"winner_side":0,"mvp_uid":555194585,"svp_uid":1614749236,"match_time_stamp":1745291424,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1043,"hero_name":"star-lord","hero_type":"/heroes/transformations/star-lord-headbig-0.webp","kills":30,"deaths":9,"assists":3,"is_win":{"score":0,"is_win":false},"disconnected":false,"camp":1,"score_change":-24.459319519183282,"level":6,"new_level":6,"new_score":3556.013517734066}},{"match_uid":"5514863_1745288896_1292282_11001_12","map_id":1292,"map_thumbnail":"/rivals/maps/map_1292.png","duration":1103.2518107891083,"season":3,"winner_side":0,"mvp_uid":1322611509,"svp_uid":119920347,"match_time_stamp":1745290196,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":3,"1":2},"player_performance":{"player_uid":1322611509,"hero_id":1016,"hero_name":"loki","hero_type":"/heroes/transformations/loki-headbig-0.webp","kills":35,"deaths":13,"assists":41,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":29.462204817149996,"level":6,"new_level":6,"new_score":3580.4728372532495}},{"match_uid":"5517983_1745283959_1290323_11001_11","map_id":1290,"map_thumbnail":"/rivals/maps/map_1290.png","duration":304.87094616889954,"season":3,"winner_side":1,"mvp_uid":1065665470,"svp_uid":162474267,"match_time_stamp":1745284453,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":0,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1030,"hero_name":"moon knight","hero_type":"/heroes/transformations/moon-knight-headbig-0.webp","kills":15,"deaths":1,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":32.56301638658351,"level":6,"new_level":6,"new_score":3597.4126220739427}},{"match_uid":"5518345_1745192589_1292209_11001_11","map_id":1292,"map_thumbnail":"/rivals/maps/map_1292.png","duration":743.0164263248444,"season":3,"winner_side":0,"mvp_uid":1101492848,"svp_uid":645353976,"match_time_stamp":1745193527,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":3,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1042,"hero_name":"peni parker","hero_type":"/heroes/transformations/peni-parker-headbig-0.webp","kills":17,"deaths":6,"assists":2,"is_win":{"score":0,"is_win":false},"disconnected":false,"camp":1,"score_change":-18.013783928032353,"level":6,"new_level":6,"new_score":3564.8496056873596}},{"match_uid":"5518655_1745191499_1288096_11001_11","map_id":1288,"map_thumbnail":"/rivals/maps/map_1288.png","duration":838.7698905467987,"season":3,"winner_side":0,"mvp_uid":388437896,"svp_uid":764870112,"match_time_stamp":1745192560,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1048,"hero_name":"psylocke","hero_type":"/heroes/transformations/psylocke-headbig-0.webp","kills":22,"deaths":10,"assists":0,"is_win":{"score":0,"is_win":false},"disconnected":false,"camp":1,"score_change":0,"level":6,"new_level":6,"new_score":3582.863389615392}},{"match_uid":"5518682_1745190725_1231060_11001_11","map_id":1231,"map_thumbnail":"/rivals/maps/map_1231.png","duration":553.386589050293,"season":3,"winner_side":1,"mvp_uid":1322611509,"svp_uid":529731273,"match_time_stamp":1745191468,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":1,"1":2},"player_performance":{"player_uid":1322611509,"hero_id":1016,"hero_name":"loki","hero_type":"/heroes/transformations/loki-headbig-0.webp","kills":15,"deaths":2,"assists":20,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":1,"score_change":43.4317098455067,"level":6,"new_level":6,"new_score":3582.863389615392}},{"match_uid":"5513768_1744824348_1245129_11001_12","map_id":1245,"map_thumbnail":"/rivals/maps/map_1245.png","duration":580.4541609287262,"season":3,"winner_side":0,"mvp_uid":890242639,"svp_uid":1680140938,"match_time_stamp":1744825123,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":3,"1":0},"player_performance":{"player_uid":1322611509,"hero_id":1048,"hero_name":"psylocke","hero_type":"/heroes/transformations/psylocke-headbig-0.webp","kills":24,"deaths":2,"assists":0,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":32.429477086483075,"level":5,"new_level":5,"new_score":3465.408256594189}},{"match_uid":"5513988_1744823383_1288150_11001_12","map_id":1288,"map_thumbnail":"/rivals/maps/map_1288.png","duration":717.5878329277039,"season":3,"winner_side":0,"mvp_uid":1322611509,"svp_uid":999286622,"match_time_stamp":1744824319,"play_mode_id":0,"game_mode_id":2,"score_info":{"0":2,"1":1},"player_performance":{"player_uid":1322611509,"hero_id":1048,"hero_name":"psylocke","hero_type":"/heroes/transformations/psylocke-headbig-0.webp","kills":24,"deaths":8,"assists":1,"is_win":{"score":1,"is_win":true},"disconnected":false,"camp":0,"score_change":33.97464855732733,"level":5,"new_level":5,"new_score":3432.978779507706}}],"rank_history":[{"match_time_stamp":1746547785,"level_progression":{"from":11,"to":12},"score_progression":{"add_score":23.362722370341544,"total_score":4103.325483635233}},{"match_time_stamp":1746484594,"level_progression":{"from":10,"to":11},"score_progression":{"add_score":28.722887344769788,"total_score":4004.416889664711}},{"match_time_stamp":1745738172,"level_progression":{"from":8,"to":9},"score_progression":{"add_score":43.071675213859635,"total_score":3812.8795796461955}}],"hero_matchups":[{"hero_id":1050,"hero_name":"invisible woman","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/invisible-woman-headbig-0.webp","matches":6,"wins":1,"win_rate":"16.67"},{"hero_id":1053,"hero_name":"emma frost","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/emma-frost-headbig-0.webp","matches":12,"wins":6,"win_rate":"50.00"},{"hero_id":1045,"hero_name":"namor","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/namor-headbig-0.webp","matches":7,"wins":1,"win_rate":"14.29"},{"hero_id":1017,"hero_name":"human torch","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/human-torch-headbig-0.webp","matches":1,"wins":0,"win_rate":"0.00"},{"hero_id":1027,"hero_name":"groot","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/groot-headbig-0.webp","matches":7,"wins":3,"win_rate":"42.86"},{"hero_id":1035,"hero_name":"venom","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/venom-headbig-0.webp","matches":1,"wins":0,"win_rate":"0.00"},{"hero_id":1033,"hero_name":"black widow","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/black-widow-headbig-0.webp","matches":1,"wins":0,"win_rate":"0.00"},{"hero_id":1047,"hero_name":"jeff the land shark","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/jeff-the-land-shark-headbig-0.webp","matches":5,"wins":3,"win_rate":"60.00"},{"hero_id":1046,"hero_name":"adam warlock","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/adam-warlock-headbig-0.webp","matches":3,"wins":0,"win_rate":"0.00"},{"hero_id":1040,"hero_name":"mister fantastic","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/mister-fantastic-headbig-0.webp","matches":2,"wins":2,"win_rate":"100.00"},{"hero_id":1026,"hero_name":"black panther","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/black-panther-headbig-0.webp","matches":1,"wins":1,"win_rate":"100.00"},{"hero_id":1024,"hero_name":"hela","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/hela-headbig-0.webp","matches":2,"wins":0,"win_rate":"0.00"},{"hero_id":1020,"hero_name":"mantis","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/mantis-headbig-0.webp","matches":3,"wins":1,"win_rate":"33.33"},{"hero_id":1030,"hero_name":"moon knight","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/moon-knight-headbig-0.webp","matches":9,"wins":2,"win_rate":"22.22"},{"hero_id":1015,"hero_name":"storm","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/storm-headbig-0.webp","matches":1,"wins":0,"win_rate":"0.00"},{"hero_id":1029,"hero_name":"magik","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/magik-headbig-0.webp","matches":3,"wins":2,"win_rate":"66.67"},{"hero_id":1025,"hero_name":"cloak & dagger","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/cloak-dagger-headbig-0.webp","matches":16,"wins":4,"win_rate":"25.00"},{"hero_id":1042,"hero_name":"peni parker","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/peni-parker-headbig-0.webp","matches":2,"wins":0,"win_rate":"0.00"},{"hero_id":1036,"hero_name":"spider-man","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/spider-man-headbig-0.webp","matches":4,"wins":1,"win_rate":"25.00"},{"hero_id":1016,"hero_name":"loki","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/loki-headbig-0.webp","matches":8,"wins":3,"win_rate":"37.50"},{"hero_id":1041,"hero_name":"winter soldier","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/winter-soldier-headbig-0.webp","matches":4,"wins":3,"win_rate":"75.00"},{"hero_id":1031,"hero_name":"luna snow","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/luna-snow-headbig-0.webp","matches":7,"wins":3,"win_rate":"42.86"},{"hero_id":1051,"hero_name":"the thing","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/the-thing-headbig-0.webp","matches":4,"wins":1,"win_rate":"25.00"},{"hero_id":1037,"hero_name":"magneto","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/magneto-headbig-0.webp","matches":4,"wins":2,"win_rate":"50.00"},{"hero_id":1022,"hero_name":"captain america","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/captain-america-headbig-0.webp","matches":4,"wins":1,"win_rate":"25.00"},{"hero_id":1023,"hero_name":"rocket raccoon","hero_class":"Strategist","hero_thumbnail":"/heroes/transformations/rocket-raccoon-headbig-0.webp","matches":9,"wins":5,"win_rate":"55.56"},{"hero_id":1034,"hero_name":"iron man","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/iron-man-headbig-0.webp","matches":5,"wins":2,"win_rate":"40.00"},{"hero_id":1021,"hero_name":"hawkeye","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/hawkeye-headbig-0.webp","matches":3,"wins":1,"win_rate":"33.33"},{"hero_id":1039,"hero_name":"thor","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/thor-headbig-0.webp","matches":3,"wins":1,"win_rate":"33.33"},{"hero_id":1011,"hero_name":"hulk","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/bruce-banner-headbig-0.webp","matches":3,"wins":1,"win_rate":"33.33"},{"hero_id":1014,"hero_name":"the punisher","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/the-punisher-headbig-0.webp","matches":1,"wins":0,"win_rate":"0.00"},{"hero_id":1018,"hero_name":"doctor strange","hero_class":"Vanguard","hero_thumbnail":"/heroes/transformations/doctor-strange-headbig-0.webp","matches":8,"wins":2,"win_rate":"25.00"},{"hero_id":1048,"hero_name":"psylocke","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/psylocke-headbig-0.webp","matches":3,"wins":0,"win_rate":"0.00"},{"hero_id":1038,"hero_name":"scarlet witch","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/scarlet-witch-headbig-0.webp","matches":6,"wins":1,"win_rate":"16.67"},{"hero_id":1032,"hero_name":"squirrel girl","hero_class":"Duelist","hero_thumbnail":"/heroes/transformations/squirrel-girl-headbig-0.webp","matches":4,"wins":1,"win_rate":"25.00"}],"team_mates":[{"player_info":{"nick_name":"CiansLive","player_icon":"/rivals/players/heads/player_head_31024202.png","player_uid":879915768},"matches":6,"wins":6,"win_rate":"100.00"},{"player_info":{"nick_name":"kimbo","player_icon":"/rivals/players/heads/player_head_31039202.png","player_uid":1390343507},"matches":2,"wins":1,"win_rate":"50.00"},{"player_info":{"nick_name":"mjac3","player_icon":"/rivals/players/heads/player_head_31033901.png","player_uid":89230394},"matches":2,"wins":2,"win_rate":"100.00"},{"player_info":{"nick_name":"takeªseat","player_icon":"/rivals/players/heads/player_head_31053201.png","player_uid":1140692546},"matches":1,"wins":1,"win_rate":"100.00"},{"player_info":{"nick_name":"MrGalaxy0","player_icon":"/rivals/players/heads/player_head_31034203.png","player_uid":1614749236},"matches":1,"wins":0,"win_rate":"0.00"},{"player_info":{"nick_name":"Abstrakkt","player_icon":"/rivals/players/heads/player_head_31035201.png","player_uid":1065665470},"matches":1,"wins":1,"win_rate":"100.00"},{"player_info":{"nick_name":"kkinnyy","player_icon":"/rivals/players/heads/player_head_30000001.png","player_uid":550871181},"matches":1,"wins":1,"win_rate":"100.00"},{"player_info":{"nick_name":"exoticdaddy","player_icon":"/rivals/players/heads/player_head_30000001.png","player_uid":1341794572},"matches":1,"wins":1,"win_rate":"100.00"},{"player_info":{"nick_name":"AddMySnapchat","player_icon":"/rivals/players/heads/player_head_30000001.png","player_uid":1731214374},"matches":1,"wins":1,"win_rate":"100.00"},{"player_info":{"nick_name":"Akimito_090","player_icon":"/rivals/players/heads/player_head_31035204.png","player_uid":1547165369},"matches":1,"wins":1,"win_rate":"100.00"}],"heroes_ranked":[{"hero_id":1011,"hero_name":"hulk","hero_thumbnail":"/heroes/transformations/bruce-banner-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":316.9592981413007,"damage":2894.522186279297,"heal":0,"damage_taken":7340.81666469574,"main_attack":{"total":58,"hits":23}},{"hero_id":1016,"hero_name":"loki","hero_thumbnail":"/heroes/transformations/loki-headbig-0.webp","matches":5,"wins":5,"mvp":1,"svp":0,"kills":93,"deaths":21,"assists":97,"play_time":2987.526511672884,"damage":42702.22179365158,"heal":68446.80726450682,"damage_taken":19193.42642736435,"main_attack":{"total":7379,"hits":2964}},{"hero_id":1017,"hero_name":"human torch","hero_thumbnail":"/heroes/transformations/human-torch-headbig-0.webp","matches":2,"wins":2,"mvp":2,"svp":0,"kills":41,"deaths":5,"assists":0,"play_time":927.5642023142427,"damage":26289.620686531067,"heal":0,"damage_taken":6479.496718883514,"main_attack":{"total":7014,"hits":1151}},{"hero_id":1024,"hero_name":"hela","hero_thumbnail":"/heroes/transformations/hela-headbig-0.webp","matches":3,"wins":2,"mvp":0,"svp":0,"kills":41,"deaths":17,"assists":4,"play_time":2092.525958172977,"damage":51644.226503014565,"heal":0,"damage_taken":20182.113464951515,"main_attack":{"total":1151,"hits":409}},{"hero_id":1026,"hero_name":"black panther","hero_thumbnail":"/heroes/transformations/black-panther-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":155.9361320771277,"damage":0,"heal":0,"damage_taken":0,"main_attack":{"total":0,"hits":0}},{"hero_id":1027,"hero_name":"groot","hero_thumbnail":"/heroes/transformations/groot-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":322.6147703193128,"damage":3919.07581615448,"heal":0,"damage_taken":9882.630446910858,"main_attack":{"total":88,"hits":40}},{"hero_id":1030,"hero_name":"moon knight","hero_thumbnail":"/heroes/transformations/moon-knight-headbig-0.webp","matches":2,"wins":1,"mvp":0,"svp":1,"kills":16,"deaths":4,"assists":0,"play_time":1131.7819512467831,"damage":40865.700342178345,"heal":168.23951721191406,"damage_taken":8485.191131353378,"main_attack":{"total":2364,"hits":754}},{"hero_id":1031,"hero_name":"luna snow","hero_thumbnail":"/heroes/transformations/luna-snow-headbig-0.webp","matches":4,"wins":2,"mvp":2,"svp":0,"kills":29,"deaths":10,"assists":39,"play_time":1512.4126051012427,"damage":14939.682988643646,"heal":41244.60721319169,"damage_taken":15491.78943681717,"main_attack":{"total":2722,"hits":1229}},{"hero_id":1035,"hero_name":"venom","hero_thumbnail":"/heroes/transformations/venom-headbig-0.webp","matches":2,"wins":2,"mvp":0,"svp":0,"kills":47,"deaths":9,"assists":6,"play_time":1995.20707176812,"damage":42571.295760154724,"heal":0,"damage_taken":78633.18634808064,"main_attack":{"total":3596,"hits":1215}},{"hero_id":1036,"hero_name":"spider-man","hero_thumbnail":"/heroes/transformations/spider-man-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":47.3100654091686,"damage":0,"heal":0,"damage_taken":0,"main_attack":{"total":0,"hits":0}},{"hero_id":1037,"hero_name":"magneto","hero_thumbnail":"/heroes/transformations/magneto-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":10.596518145874143,"damage":0,"heal":0,"damage_taken":0,"main_attack":{"total":0,"hits":0}},{"hero_id":1041,"hero_name":"winter soldier","hero_thumbnail":"/heroes/transformations/winter-soldier-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":243.06887410581112,"damage":669.3155517578125,"heal":0,"damage_taken":970.2551681995392,"main_attack":{"total":48,"hits":7}},{"hero_id":1042,"hero_name":"peni parker","hero_thumbnail":"/heroes/transformations/peni-parker-headbig-0.webp","matches":1,"wins":0,"mvp":0,"svp":0,"kills":10,"deaths":3,"assists":2,"play_time":610.1787191256881,"damage":14878.788617134094,"heal":2501.5836791992188,"damage_taken":28177.927361011505,"main_attack":{"total":848,"hits":269}},{"hero_id":1043,"hero_name":"star-lord","hero_thumbnail":"/heroes/transformations/star-lord-headbig-0.webp","matches":1,"wins":0,"mvp":0,"svp":0,"kills":18,"deaths":4,"assists":0,"play_time":602.2667636517435,"damage":12742.89222919941,"heal":0,"damage_taken":5990.478563308716,"main_attack":{"total":3249,"hits":951}},{"hero_id":1045,"hero_name":"namor","hero_thumbnail":"/heroes/transformations/namor-headbig-0.webp","matches":3,"wins":1,"mvp":0,"svp":0,"kills":14,"deaths":9,"assists":0,"play_time":1163.1189749762416,"damage":32967.179057359695,"heal":0,"damage_taken":13342.319081306458,"main_attack":{"total":533,"hits":162}},{"hero_id":1046,"hero_name":"adam warlock","hero_thumbnail":"/heroes/transformations/adam-warlock-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":588.3866375535727,"damage":4828.731117248535,"heal":9855.973371505737,"damage_taken":5337.762875139713,"main_attack":{"total":106,"hits":37}},{"hero_id":1048,"hero_name":"psylocke","hero_thumbnail":"/heroes/transformations/psylocke-headbig-0.webp","matches":3,"wins":2,"mvp":1,"svp":0,"kills":60,"deaths":13,"assists":0,"play_time":1827.7693011686206,"damage":43171.60760092735,"heal":0,"damage_taken":17722.99152946472,"main_attack":{"total":8228,"hits":2347}},{"hero_id":1050,"hero_name":"invisible woman","hero_thumbnail":"/heroes/transformations/invisible-woman-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":36.99990430474281,"damage":0,"heal":0,"damage_taken":0,"main_attack":{"total":0,"hits":0}},{"hero_id":1051,"hero_name":"the thing","hero_thumbnail":"/heroes/transformations/the-thing-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":295.3009053468704,"damage":555,"heal":0,"damage_taken":2300.078332901001,"main_attack":{"total":12,"hits":6}},{"hero_id":1053,"hero_name":"emma frost","hero_thumbnail":"/heroes/transformations/emma-frost-headbig-0.webp","matches":1,"wins":1,"mvp":0,"svp":0,"kills":10,"deaths":1,"assists":1,"play_time":384.8329474963248,"damage":3900.6549401283264,"heal":0,"damage_taken":13600.21033525467,"main_attack":{"total":1280,"hits":310}}],"heroes_unranked":[{"hero_id":1036,"hero_name":"spider-man","hero_thumbnail":"/heroes/transformations/spider-man-headbig-0.webp","matches":1,"wins":1,"mvp":0,"svp":0,"kills":7,"deaths":2,"assists":0,"play_time":334.46173794195056,"damage":4237.044411659241,"heal":0,"damage_taken":2253.3524384498596,"main_attack":{"total":39,"hits":11}},{"hero_id":1042,"hero_name":"peni parker","hero_thumbnail":"/heroes/transformations/peni-parker-headbig-0.webp","matches":1,"wins":0,"mvp":0,"svp":0,"kills":6,"deaths":3,"assists":1,"play_time":272.10531611181796,"damage":7424.0520877838135,"heal":1134.5445556640625,"damage_taken":10465.18960428238,"main_attack":{"total":345,"hits":87}},{"hero_id":1045,"hero_name":"namor","hero_thumbnail":"/heroes/transformations/namor-headbig-0.webp","matches":1,"wins":1,"mvp":0,"svp":0,"kills":15,"deaths":2,"assists":0,"play_time":388.2432472836226,"damage":13026.734666347504,"heal":0,"damage_taken":2113.3350768089294,"main_attack":{"total":178,"hits":48}},{"hero_id":1046,"hero_name":"adam warlock","hero_thumbnail":"/heroes/transformations/adam-warlock-headbig-0.webp","matches":0,"wins":0,"mvp":0,"svp":0,"kills":0,"deaths":0,"assists":0,"play_time":108.0768200326711,"damage":0,"heal":0,"damage_taken":0,"main_attack":{"total":0,"hits":0}}],"maps":[{"map_id":1032,"map_thumbnail":"/rivals/maps/map_1032.png","matches":1,"wins":0,"kills":6,"deaths":5,"assists":1,"play_time":380.18213614448905},{"map_id":1101,"map_thumbnail":"/rivals/maps/map_1101.png","matches":1,"wins":1,"kills":17,"deaths":3,"assists":0,"play_time":480.00634820759296},{"map_id":1217,"map_thumbnail":"/rivals/maps/map_1217.png","matches":1,"wins":1,"kills":7,"deaths":2,"assists":0,"play_time":242.69863701798022},{"map_id":1231,"map_thumbnail":"/rivals/maps/map_1231.png","matches":5,"wins":4,"kills":73,"deaths":25,"assists":25,"play_time":2603.7866272479296},{"map_id":1245,"map_thumbnail":"/rivals/maps/map_1245.png","matches":5,"wins":4,"kills":109,"deaths":22,"assists":33,"play_time":3486.0813829377294},{"map_id":1267,"map_thumbnail":"/rivals/maps/map_1267.png","matches":1,"wins":0,"kills":6,"deaths":8,"assists":0,"play_time":536.0972826499492},{"map_id":1272,"map_thumbnail":"/rivals/maps/map_1272.png","matches":2,"wins":2,"kills":36,"deaths":12,"assists":39,"play_time":1353.504641432315},{"map_id":1288,"map_thumbnail":"/rivals/maps/map_1288.png","matches":2,"wins":1,"kills":46,"deaths":18,"assists":1,"play_time":1556.3245854116976},{"map_id":1290,"map_thumbnail":"/rivals/maps/map_1290.png","matches":2,"wins":2,"kills":39,"deaths":4,"assists":20,"play_time":1032.4465995058417},{"map_id":1291,"map_thumbnail":"/rivals/maps/map_1291.png","matches":1,"wins":0,"kills":6,"deaths":4,"assists":0,"play_time":318.0269849356264},{"map_id":1292,"map_thumbnail":"/rivals/maps/map_1292.png","matches":5,"wins":3,"kills":114,"deaths":37,"assists":62,"play_time":3770.9083062093705},{"map_id":1310,"map_thumbnail":"/rivals/maps/map_1310.png","matches":4,"wins":2,"kills":80,"deaths":24,"assists":3,"play_time":2595.1817017681897}]}'
test("PlayerSchema parses api response", () => {
    const parsedResponse = JSON.parse(mockApiResponse);
    const player = PlayerSchema.parse(parsedResponse);
    expect(player.uid).toBe('1322611509');
    expect(player.name).toBe('gravitinos');
    expect(player.player).toEqual({
        uid: 1322611509,
        level: '37',
        name: 'gravitinos',
        icon: {
            player_icon_id: '31031202',
            player_icon: '/players/heads/player_head_31031202.png'
        },
        rank: {
            rank: 'Invalid level',
            image: null,
            color: null
        },
        team: {
            club_team_id: '',
            club_team_mini_name: '',
            club_team_type: '0'
        },
        info: {
            completed_achievements: '88',
            login_os: 'PC',
            rank_game_season: {
                '1001001': {
                    rank_game_id: 1,
                    level: 5,
                    rank_score: 3414.2303453366185,
                    max_level: 5,
                    max_rank_score: 3435.513236595722,
                    update_time: 1736479209,
                    win_count: 19,
                    protect_score: 3,
                    diff_score: -21.282891259103508
                },
                '1001002': {
                    rank_game_id: 2,
                    level: 4,
                    rank_score: 3322.238912140294,
                    max_level: 4,
                    max_rank_score: 3350.3270446071765,
                    update_time: 1739338268,
                    win_count: 14,
                    protect_score: 1,
                    diff_score: -22.103193693683806
                },
                '1001003': {
                    diff_score: -23.762738463792175,
                    rank_game_id: 3,
                    level: 12,
                    rank_score: 4088.759023267706,
                    max_level: 12,
                    max_rank_score: 4112.521761731498,
                    protect_score: 0,
                    update_time: 1742318981,
                    win_count: 50
                }
            }
        }
    });
    expect(player.updates).toEqual({
        info_update_time: "1/19/2025, 2:49:14 PM",
        last_history_update: "3/20/2025, 2:55:39 PM",
        last_inserted_match: "3/18/2025, 1:18:05 PM",
        last_update_request: "3/20/2025, 2:55:35 PM",
    });
    expect(player.overall_stats).toEqual({total_matches: 30,
        total_wins: 20,
        unranked: {
          total_matches: 3,
          total_wins: 2,
          total_assists: 1,
          total_deaths: 10,
          total_kills: 30,
          total_time_played: "18m 22s",
          total_time_played_raw: 1102.9046919345856,
          total_mvp: 0,
          total_svp: 0,
        },
        ranked: {
          total_matches: 27,
          total_wins: 18,
          total_assists: 183,
          total_deaths: 154,
          total_kills: 509,
          total_time_played: "4h 47m 32s",
          total_time_played_raw: 17252.567150115967,
          total_mvp: 6,
          total_svp: 1
    }});
    expect(player.match_history).toEqual([
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
      ]);
    expect(player.rank_history).toEqual([{},{},{}])
    expect(player.hero_matchups).toEqual([{
        hero_id: 1050,
        win_rate: 16.67,
      }, {
        hero_id: 1053,
        win_rate: 50,
      }, {
        hero_id: 1045,
        win_rate: 14.29,
      }, {
        hero_id: 1017,
        win_rate: 0,
      }, {
        hero_id: 1027,
        win_rate: 42.86,
      }, {
        hero_id: 1035,
        win_rate: 0,
      }, {
        hero_id: 1033,
        win_rate: 0,
      }, {
        hero_id: 1047,
        win_rate: 60,
      }, {
        hero_id: 1046,
        win_rate: 0,
      }, {
        hero_id: 1040,
        win_rate: 100,
      }, {
        hero_id: 1026,
        win_rate: 100,
      }, {
        hero_id: 1024,
        win_rate: 0,
      }, {
        hero_id: 1020,
        win_rate: 33.33,
      }, {
        hero_id: 1030,
        win_rate: 22.22,
      }, {
        hero_id: 1015,
        win_rate: 0,
      }, {
        hero_id: 1029,
        win_rate: 66.67,
      }, {
        hero_id: 1025,
        win_rate: 25,
      }, {
        hero_id: 1042,
        win_rate: 0,
      }, {
        hero_id: 1036,
        win_rate: 25,
      }, {
        hero_id: 1016,
        win_rate: 37.5,
      }, {
        hero_id: 1041,
        win_rate: 75,
      }, {
        hero_id: 1031,
        win_rate: 42.86,
      }, {
        hero_id: 1051,
        win_rate: 25,
      }, {
        hero_id: 1037,
        win_rate: 50,
      }, {
        hero_id: 1022,
        win_rate: 25,
      }, {
        hero_id: 1023,
        win_rate: 55.56,
      }, {
        hero_id: 1034,
        win_rate: 40,
      }, {
        hero_id: 1021,
        win_rate: 33.33,
      }, {
        hero_id: 1039,
        win_rate: 33.33,
      }, {
        hero_id: 1011,
        win_rate: 33.33,
      }, {
        hero_id: 1014,
        win_rate: 0,
      }, {
        hero_id: 1018,
        win_rate: 25,
      }, {
        hero_id: 1048,
        win_rate: 0,
      }, {
        hero_id: 1038,
        win_rate: 16.67,
      }, {
        hero_id: 1032,
        win_rate: 25,
      }
    ]);
    expect(player.team_mates).toEqual(parsedResponse.team_mates);
    expect(player.heroes_ranked).toEqual(parsedResponse.heroes_ranked);
    expect(player.heroes_ranked).toEqual([
        {
          hero_id: 1011,
          hero_name: "hulk",
          hero_thumbnail: "/heroes/transformations/bruce-banner-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 316.9592981413007,
          damage: 2894.522186279297,
          heal: 0,
          damage_taken: 7340.81666469574,
          main_attack: {
            total: 58,
            hits: 23,
          },
        }, {
          hero_id: 1016,
          hero_name: "loki",
          hero_thumbnail: "/heroes/transformations/loki-headbig-0.webp",
          matches: 5,
          wins: 5,
          mvp: 1,
          svp: 0,
          kills: 93,
          deaths: 21,
          assists: 97,
          play_time: 2987.526511672884,
          damage: 42702.22179365158,
          heal: 68446.80726450682,
          damage_taken: 19193.42642736435,
          main_attack: {
            total: 7379,
            hits: 2964,
          },
        }, {
          hero_id: 1017,
          hero_name: "human torch",
          hero_thumbnail: "/heroes/transformations/human-torch-headbig-0.webp",
          matches: 2,
          wins: 2,
          mvp: 2,
          svp: 0,
          kills: 41,
          deaths: 5,
          assists: 0,
          play_time: 927.5642023142427,
          damage: 26289.620686531067,
          heal: 0,
          damage_taken: 6479.496718883514,
          main_attack: {
            total: 7014,
            hits: 1151,
          },
        }, {
          hero_id: 1024,
          hero_name: "hela",
          hero_thumbnail: "/heroes/transformations/hela-headbig-0.webp",
          matches: 3,
          wins: 2,
          mvp: 0,
          svp: 0,
          kills: 41,
          deaths: 17,
          assists: 4,
          play_time: 2092.525958172977,
          damage: 51644.226503014565,
          heal: 0,
          damage_taken: 20182.113464951515,
          main_attack: {
            total: 1151,
            hits: 409,
          },
        }, {
          hero_id: 1026,
          hero_name: "black panther",
          hero_thumbnail: "/heroes/transformations/black-panther-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 155.9361320771277,
          damage: 0,
          heal: 0,
          damage_taken: 0,
          main_attack: {
            total: 0,
            hits: 0,
          },
        }, {
          hero_id: 1027,
          hero_name: "groot",
          hero_thumbnail: "/heroes/transformations/groot-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 322.6147703193128,
          damage: 3919.07581615448,
          heal: 0,
          damage_taken: 9882.630446910858,
          main_attack: {
            total: 88,
            hits: 40,
          },
        }, {
          hero_id: 1030,
          hero_name: "moon knight",
          hero_thumbnail: "/heroes/transformations/moon-knight-headbig-0.webp",
          matches: 2,
          wins: 1,
          mvp: 0,
          svp: 1,
          kills: 16,
          deaths: 4,
          assists: 0,
          play_time: 1131.7819512467831,
          damage: 40865.700342178345,
          heal: 168.23951721191406,
          damage_taken: 8485.191131353378,
          main_attack: {
            total: 2364,
            hits: 754,
          },
        }, {
          hero_id: 1031,
          hero_name: "luna snow",
          hero_thumbnail: "/heroes/transformations/luna-snow-headbig-0.webp",
          matches: 4,
          wins: 2,
          mvp: 2,
          svp: 0,
          kills: 29,
          deaths: 10,
          assists: 39,
          play_time: 1512.4126051012427,
          damage: 14939.682988643646,
          heal: 41244.60721319169,
          damage_taken: 15491.78943681717,
          main_attack: {
            total: 2722,
            hits: 1229,
          },
        }, {
          hero_id: 1035,
          hero_name: "venom",
          hero_thumbnail: "/heroes/transformations/venom-headbig-0.webp",
          matches: 2,
          wins: 2,
          mvp: 0,
          svp: 0,
          kills: 47,
          deaths: 9,
          assists: 6,
          play_time: 1995.20707176812,
          damage: 42571.295760154724,
          heal: 0,
          damage_taken: 78633.18634808064,
          main_attack: {
            total: 3596,
            hits: 1215,
          },
        }, {
          hero_id: 1036,
          hero_name: "spider-man",
          hero_thumbnail: "/heroes/transformations/spider-man-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 47.3100654091686,
          damage: 0,
          heal: 0,
          damage_taken: 0,
          main_attack: {
            total: 0,
            hits: 0,
          },
        }, {
          hero_id: 1037,
          hero_name: "magneto",
          hero_thumbnail: "/heroes/transformations/magneto-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 10.596518145874143,
          damage: 0,
          heal: 0,
          damage_taken: 0,
          main_attack: {
            total: 0,
            hits: 0,
          },
        }, {
          hero_id: 1041,
          hero_name: "winter soldier",
          hero_thumbnail: "/heroes/transformations/winter-soldier-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 243.06887410581112,
          damage: 669.3155517578125,
          heal: 0,
          damage_taken: 970.2551681995392,
          main_attack: {
            total: 48,
            hits: 7,
          },
        }, {
          hero_id: 1042,
          hero_name: "peni parker",
          hero_thumbnail: "/heroes/transformations/peni-parker-headbig-0.webp",
          matches: 1,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 10,
          deaths: 3,
          assists: 2,
          play_time: 610.1787191256881,
          damage: 14878.788617134094,
          heal: 2501.5836791992188,
          damage_taken: 28177.927361011505,
          main_attack: {
            total: 848,
            hits: 269,
          },
        }, {
          hero_id: 1043,
          hero_name: "star-lord",
          hero_thumbnail: "/heroes/transformations/star-lord-headbig-0.webp",
          matches: 1,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 18,
          deaths: 4,
          assists: 0,
          play_time: 602.2667636517435,
          damage: 12742.89222919941,
          heal: 0,
          damage_taken: 5990.478563308716,
          main_attack: {
            total: 3249,
            hits: 951,
          },
        }, {
          hero_id: 1045,
          hero_name: "namor",
          hero_thumbnail: "/heroes/transformations/namor-headbig-0.webp",
          matches: 3,
          wins: 1,
          mvp: 0,
          svp: 0,
          kills: 14,
          deaths: 9,
          assists: 0,
          play_time: 1163.1189749762416,
          damage: 32967.179057359695,
          heal: 0,
          damage_taken: 13342.319081306458,
          main_attack: {
            total: 533,
            hits: 162,
          },
        }, {
          hero_id: 1046,
          hero_name: "adam warlock",
          hero_thumbnail: "/heroes/transformations/adam-warlock-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 588.3866375535727,
          damage: 4828.731117248535,
          heal: 9855.973371505737,
          damage_taken: 5337.762875139713,
          main_attack: {
            total: 106,
            hits: 37,
          },
        }, {
          hero_id: 1048,
          hero_name: "psylocke",
          hero_thumbnail: "/heroes/transformations/psylocke-headbig-0.webp",
          matches: 3,
          wins: 2,
          mvp: 1,
          svp: 0,
          kills: 60,
          deaths: 13,
          assists: 0,
          play_time: 1827.7693011686206,
          damage: 43171.60760092735,
          heal: 0,
          damage_taken: 17722.99152946472,
          main_attack: {
            total: 8228,
            hits: 2347,
          },
        }, {
          hero_id: 1050,
          hero_name: "invisible woman",
          hero_thumbnail: "/heroes/transformations/invisible-woman-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 36.99990430474281,
          damage: 0,
          heal: 0,
          damage_taken: 0,
          main_attack: {
            total: 0,
            hits: 0,
          },
        }, {
          hero_id: 1051,
          hero_name: "the thing",
          hero_thumbnail: "/heroes/transformations/the-thing-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 295.3009053468704,
          damage: 555,
          heal: 0,
          damage_taken: 2300.078332901001,
          main_attack: {
            total: 12,
            hits: 6,
          },
        }, {
          hero_id: 1053,
          hero_name: "emma frost",
          hero_thumbnail: "/heroes/transformations/emma-frost-headbig-0.webp",
          matches: 1,
          wins: 1,
          mvp: 0,
          svp: 0,
          kills: 10,
          deaths: 1,
          assists: 1,
          play_time: 384.8329474963248,
          damage: 3900.6549401283264,
          heal: 0,
          damage_taken: 13600.21033525467,
          main_attack: {
            total: 1280,
            hits: 310,
          },
        }
      ]);

    expect(player.heroes_unranked).toEqual([
        {
          hero_id: 1036,
          hero_name: "spider-man",
          hero_thumbnail: "/heroes/transformations/spider-man-headbig-0.webp",
          matches: 1,
          wins: 1,
          mvp: 0,
          svp: 0,
          kills: 7,
          deaths: 2,
          assists: 0,
          play_time: 334.46173794195056,
          damage: 4237.044411659241,
          heal: 0,
          damage_taken: 2253.3524384498596,
          main_attack: {
            total: 39,
            hits: 11,
          },
        }, {
          hero_id: 1042,
          hero_name: "peni parker",
          hero_thumbnail: "/heroes/transformations/peni-parker-headbig-0.webp",
          matches: 1,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 6,
          deaths: 3,
          assists: 1,
          play_time: 272.10531611181796,
          damage: 7424.0520877838135,
          heal: 1134.5445556640625,
          damage_taken: 10465.18960428238,
          main_attack: {
            total: 345,
            hits: 87,
          },
        }, {
          hero_id: 1045,
          hero_name: "namor",
          hero_thumbnail: "/heroes/transformations/namor-headbig-0.webp",
          matches: 1,
          wins: 1,
          mvp: 0,
          svp: 0,
          kills: 15,
          deaths: 2,
          assists: 0,
          play_time: 388.2432472836226,
          damage: 13026.734666347504,
          heal: 0,
          damage_taken: 2113.3350768089294,
          main_attack: {
            total: 178,
            hits: 48,
          },
        }, {
          hero_id: 1046,
          hero_name: "adam warlock",
          hero_thumbnail: "/heroes/transformations/adam-warlock-headbig-0.webp",
          matches: 0,
          wins: 0,
          mvp: 0,
          svp: 0,
          kills: 0,
          deaths: 0,
          assists: 0,
          play_time: 108.0768200326711,
          damage: 0,
          heal: 0,
          damage_taken: 0,
          main_attack: {
            total: 0,
            hits: 0,
          },
        }
      ]);

    expect(player.maps).toEqual(parsedResponse.maps);
});

