export default function(message){
    var titleStyle =  'color: #fff; border-radius: 3px 0 0 3px;padding:2px 5px',
    infoStyle = 'color: #fff; border-radius: 0 3px 3px 0;padding:2px 5px',
    info_style_1 = 'background: #00cc00;'+titleStyle,
    info_style_2 = 'background: #1475B2;'+infoStyle,
    info_content = 'background: #119955;padding:2px 15px;border-radius: 0 3px 3px 0;'
    console.log("%c开始%c[INFO]["+new Date().format("yyyy/MM/dd hh:mm:ss")+"][START]%c"+message,info_style_1,info_style_2,info_content);
}
