
var camera, scene, renderer,deviceControl;
var geometry, material, mesh;
var target = new THREE.Vector3();
var isReady = false;

var lon = 90, lat = 0;
var phi = 0, theta = 0;

var touchX, touchY;

init();
animate();

window.frameWidth = getQuery('width')||window.innerWidth;
window.frameHeight = getQuery('height')||window.innerHeight;
// alert(document.getElementById('boomFrame').clientWidth)
// alert(document.getElementById('boomFrame').clientHeight)

function init() {
    window.frameWidth = getQuery('width')||window.innerWidth;
    window.frameHeight = getQuery('height')||window.innerHeight;

    camera = new THREE.PerspectiveCamera( 75, frameWidth / frameHeight, 1, 1000 );

    scene = new THREE.Scene();

    initDevices();
    initControls();

    var sides = [
        {
            position: [ -512, 0, 0 ],//位置
            rotation: [ 0, Math.PI / 2, 0 ]//角度
        },
        {
            position: [ 512, 0, 0 ],
            rotation: [ 0, -Math.PI / 2, 0 ]
        },
        {
            position: [ 0,  512, 0 ],
            rotation: [ Math.PI / 2, 0, Math.PI ]
        },
        {
            position: [ 0, -512, 0 ],
            rotation: [ - Math.PI / 2, 0, Math.PI ]
        },
        {
            position: [ 0, 0,  512 ],
            rotation: [ 0, Math.PI, 0 ]
        },
        {
            position: [ 0, 0, -512 ],
            rotation: [ 0, 0, 0 ]
        }
    ];

    /**
     * 根据六个面的信息，new出六个对象放入场景中
     */
    for ( var i = 0; i < sides.length; i ++ ) {

        var side = sides[ i ];

        var element = document.getElementById("surface_"+i);
        element.width = 1026; // 2 pixels extra to close the gap.多余的2像素用于闭合正方体

        var object = new THREE.CSS3DObject( element );
        object.position.fromArray( side.position );
        object.rotation.fromArray( side.rotation );
        scene.add( object );

    }

    var myContainer = document.getElementById('myContainer');
    var myContainerHeight = initLPFrame().myContainerHeight;


    renderer = new THREE.CSS3DRenderer();
    // debugger
    var renderWidth = frameWidth>frameHeight? frameHeight : frameWidth;
    renderer.setSize( renderWidth, renderWidth );
    myContainer.appendChild( renderer.domElement );

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'wheel', onDocumentMouseWheel, false );

    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function initLPFrame(){
    var tempframeWidth = window.innerWidth;
    var tempframeHeight = window.innerHeight;
    var windowWidth = tempframeWidth>tempframeHeight? tempframeWidth:tempframeHeight;
    var screenRate = Math.floor(100*windowWidth/1920);
    document.documentElement.style.fontSize = screenRate+'px';
    var myContainer = document.getElementById('myContainer');
    
    var myContainerHeight = tempframeWidth>tempframeHeight? tempframeHeight:tempframeWidth;
    myContainer.style.width = myContainerHeight + 'px';
    document.getElementById('lpleft').style.width = myContainerHeight + 'px';
    // alert(windowWidth+'----'+myContainerHeight);
    document.getElementById('lpright').style.width = (windowWidth - myContainerHeight) + 'px';

    initFrame((windowWidth - myContainerHeight),myContainerHeight,'innerWarp');

    return {
        myContainerHeight:myContainerHeight
    }
}

function animate() {

    requestAnimationFrame( animate );

    // lat +=  0.1;
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    target.x = Math.sin( phi ) * Math.cos( theta );
    target.y = Math.cos( phi );
    target.z = Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( target );
    /**
     * 通过传入的scene和camera
     * 获取其中object在创建时候传入的element信息
     * 以及后面定义的包括位置，角度等信息
     * 根据场景中的obj创建dom元素
     * 插入render本身自己创建的场景div中
     * 达到渲染场景的效果
     */

    camera.updateProjectionMatrix();

    if(isDeviceing && deviceControl){
        deviceControl.update(); 
        renderer.render( scene, camera ); 
    }else if(isReady){
        renderer.render( scene, camera );
    }

    

}

function onWindowResize(updataParam) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    if(updataParam && updataParam.type == 'update'){
        width = updataParam.width;
        height = updataParam.height;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    initDevices();
    initControls();
    initLPFrame();
}

function onDocumentMouseDown( event ) {

    event.preventDefault();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );

}

function onDocumentMouseMove( event ) {

    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    lon -= movementX * 0.1;
    lat += movementY * 0.1;

}

function onDocumentMouseUp( event ) {

    document.removeEventListener( 'mousemove', onDocumentMouseMove );
    document.removeEventListener( 'mouseup', onDocumentMouseUp );

}

function onDocumentMouseWheel( event ) {

    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();

}

function onDocumentTouchStart( event ) {

    event.preventDefault();

    var touch = event.touches[ 0 ];

    touchX = touch.screenX;
    touchY = touch.screenY;

}

function onDocumentTouchMove( event ) {

    event.preventDefault();

    var touch = event.touches[ 0 ];

    lon -= ( touch.screenX - touchX ) * 0.1;
    lat += ( touch.screenY - touchY ) * 0.1;

    touchX = touch.screenX;
    touchY = touch.screenY;

}



//陀螺仪部分
var controlsBtn= document.getElementById("controlBtn"); // 控制陀螺仪开关的按钮
var isDeviceing = true; // 陀螺仪状态
controlsBtn.addEventListener("touchend", controlDevice, true);
isDeviceing == true ? controlsBtn.innerHTML = 'GYRO ON' : controlsBtn.innerHTML = 'GYRO OFF';


// 初始化陀螺仪
var initDevicesTimeout = null;
function initDevices() {
    deviceControl = null;
    isReady = false;
    if(initDevices) clearTimeout(initDevicesTimeout);
    initDevicesTimeout = setTimeout(function(){
        deviceControl = new THREE.DeviceOrientationControls(camera);
        isReady = true;
    },300);
}
// 初始化控制器
function initControls() {
    // controls = new THREE.OrbitControls(camera);
}
/* 控制陀螺仪 */
function controlDevice(event) {
    if (isDeviceing == true) {
        isDeviceing = false;
        //关闭陀螺仪
        controlsBtn.innerHTML = 'GYRO OFF';
    } else {
        isDeviceing = true;
        //开启陀螺仪
        controlsBtn.innerHTML = 'GYRO ON';
    }
}

var dlbtnid = '';
switch(downloadBtnType){
    case 'text':
        dlbtnid = 'dltxtbtn';
        document.getElementById(dlbtnid).innerHTML = downloadString;
        break;
    case 'image':
        dlbtnid = 'dlimgbtn';
        document.getElementById('dlimg').src = downloadBtnImg;
        break;
    default:
        dlbtnid = 'dltxtbtn';
}

var dlbtn = document.getElementById(dlbtnid);
dlbtn.addEventListener("touchend", function(){ if(downloadUrl&&downloadUrl.length>0) window.open(downloadUrl);}, true);
// setTimeout(function(){dlbtn.className='show';},(showDownloadTime-500));
// setTimeout(function(){dlbtn.className = 'show view';},showDownloadTime);

function initFrame(containerWidth,containerHeight,warperId){
    var fitWidth = 322;
    var fitHeight = 414;

    var availableWidth = 0;
    var availableheight = 0;

    if(containerWidth/containerHeight>fitWidth/fitHeight){
        availableheight = '100%';//fitHeight
        availableWidth = (fitWidth/fitHeight * containerHeight)+'px';
    }else{
        availableWidth = '100%';//fitWidth
        availableheight = (containerWidth*fitHeight / fitWidth)+'px';
    }

    var warper = document.getElementById(warperId);
    warper.style.width = availableWidth;
    warper.style.height = availableheight;
}

var boomCount = 55;
var boomFrameRate = 1/15 *1000;
var lastBoomTime = 300;
function startBoom(index){
    var start_index = index || 0;
    var boomFrame = document.getElementById('boomFrame');
    boomFrame.style.backgroundImage = 'url("images/boom/1_004'+start_index+'.png")';
    if(start_index<boomCount-1){
        window.setTimeout(function(){ startBoom(start_index+1); },boomFrameRate);
    }else{
        window.setTimeout(function(){ boomFrame.style.display = 'none'; },lastBoomTime);
    }
    
}


window.windowSize = getScreenSize();
var windowSizeChecker = window.setInterval(function(){
    var screenSize = getScreenSize();
    var newWidth = screenSize.width>screenSize.height?screenSize.width:screenSize.height;
    var newHeight = screenSize.height>screenSize.width?screenSize.width:screenSize.height;
    // if(newWidth<newHeight){
    //     var tempWidth = newWidth;
    //     newWidth = newHeight;
    //     newHeight = newWidth;
    // }
    if(newWidth!=windowSize.width || newHeight!=windowSize.height){
        window.windowSize = getScreenSize();
        onWindowResize({
            type:'update',
            width:newWidth,
            height:newHeight
        });
    }

},500);
var windowSizeTimer = window.setTimeout(function(){
    window.clearInterval(windowSizeChecker);
},30000);



function getScreenSize(){
    var testWidthEl = document.createElement('div');
    testWidthEl.setAttribute('style', 'display:block;position:fixed;left:0px;right:0px;top:0px;bottom:0px;visibility:hidden;z-index:99999;')
    window.document.body.appendChild(testWidthEl)
    var screenWidth = testWidthEl.clientWidth;
    var screenHeight = testWidthEl.clientHeight;
    window.document.body.removeChild(testWidthEl);
    return {
      width: screenWidth>screenHeight?screenWidth:screenHeight,
      height: screenHeight>screenWidth?screenWidth:screenHeight
    };
  }


function getQuery(name) {
    var url = location.href;
    var spliter = '?';
    if (url.indexOf(spliter) < 0) return null;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.split(spliter)[1].match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}















