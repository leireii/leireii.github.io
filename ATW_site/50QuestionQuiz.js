

//<![CDATA[

<!--


//MDH_SCORM modification to support SCORM 1.2 functionality on LMS
/* JavaScript to find the SCORM API if it is available */
/* Based on a model at <http://www.claroline.net/doc/en/index.php/How_do_I_create_SCORM_content%3F> */

var API = null; /* SCORM API */

/* look up through the frameset hierarchy for the SCORM API */
function findAPI(win)
{
	while ((win.API == null) && (win.parent != null) && (win.parent != win))
	{
		win = win.parent;
	}
	API = win.API;
}

/* initialize the SCORM API */
function initAPI(win)
{
	/* look for the SCORM API up in the frameset */
	findAPI(win);

	/* if we still have not found the API, look at the opener and its frameset */
	if ((API == null) && (win.opener != null))
	{
		findAPI(win.opener);
	}
}

var ScormSubmitted = false; //use this to check whether LMSFinish has been called later.

function ScormStartUp(){
	initAPI(window);
	if (API != null){
		API.LMSInitialize(''); 
		API.LMSSetValue('cmi.core.lesson_status', 'browsed');
		API.LMSSetValue('cmi.core.score.min', 0);
		API.LMSSetValue('cmi.core.score.max', 100);
		API.LMSCommit('');
	}
}

function CheckLMSFinish(){
	if (API != null){
		if (ScormSubmitted == false){
			API.LMSCommit('');
			API.LMSFinish('');
			ScormSubmitted = true;
		}
	}
}

function SetScormIncomplete(){
	if (ScormSubmitted == true){
		return;
	}
	SetScormScore();
	if (API != null){
		API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
		API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
		API.LMSCommit('');
	}
}

function SetScormComplete(){
	if (API != null){
		API.LMSSetValue('cmi.core.session_time', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
		API.LMSSetValue('cmi.core.lesson_status', 'completed');
		SetScormScore();
		API.LMSCommit('');
		API.LMSFinish('');
		ScormSubmitted = true;
	}
}

var ScormStartTime = (new Date()).getTime();

var SuspendData = '';

function SetScormTimedOut(){
	if (API != null){
		if (ScormSubmitted == false){
			SetScormScore();
			API.LMSSetValue('cmi.core.exit', 'time-out'); 
			API.LMSCommit('');
			CheckLMSFinish();
		}
	}
}

//TIME RENDERING FUNCTION
function MillisecondsToTime(Seconds){
	Seconds = Math.round(Seconds/1000);
	var S = Seconds % 60;
	Seconds -= S;
	if (S < 10){S = '0' + S;}
	var M = (Seconds / 60) % 60;
	if (M < 10){M = '0' + M;}
	var H = Math.floor(Seconds / 3600);
	if (H < 10){H = '0' + H;}
	return H + ':' + M + ':' + S;
}




function Client(){
//if not a DOM browser, hopeless
	this.min = false; if (document.getElementById){this.min = true;};

	this.ua = navigator.userAgent;
	this.name = navigator.appName;
	this.ver = navigator.appVersion;  

//Get data about the browser
	this.mac = (this.ver.indexOf('Mac') != -1);
	this.win = (this.ver.indexOf('Windows') != -1);

//Look for Gecko
	this.gecko = (this.ua.indexOf('Gecko') > 1);
	if (this.gecko){
		this.geckoVer = parseInt(this.ua.substring(this.ua.indexOf('Gecko')+6, this.ua.length));
//		if (this.geckoVer < 20020000){this.min = false;}
	}
	
//Look for Firebird
	this.firebird = (this.ua.indexOf('Firebird') > 1);
	
//Look for Safari
	this.safari = (this.ua.indexOf('Safari') > 1);
	if (this.safari){
		this.gecko = false;
	}
	
//Look for IE
	this.ie = (this.ua.indexOf('MSIE') > 0);
	if (this.ie){
		this.ieVer = parseFloat(this.ua.substring(this.ua.indexOf('MSIE')+5, this.ua.length));
		if (this.ieVer < 5.5){this.min = false;}
	}
	
//Look for Opera
	this.opera = (this.ua.indexOf('Opera') > 0);
	if (this.opera){
		this.operaVer = parseFloat(this.ua.substring(this.ua.indexOf('Opera')+6, this.ua.length));
		if (this.operaVer < 7.04){this.min = false;}
	}
	if (this.min == false){
//		alert('Your browser may not be able to handle this page.');
	}
	
//Special case for the horrible ie5mac
	this.ie5mac = (this.ie&&this.mac&&(this.ieVer<6));
}

var C = new Client();

//for (prop in C){
//	alert(prop + ': ' + C[prop]);
//}



//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

//[strNavBarJS]
function NavBtnOver(Btn){
	if (Btn.className != 'NavButtonDown'){Btn.className = 'NavButtonUp';}
}

function NavBtnOut(Btn){
	Btn.className = 'NavButton';
}

function NavBtnDown(Btn){
	Btn.className = 'NavButtonDown';
}
//[/strNavBarJS]

function FuncBtnOver(Btn){
	if (Btn.className != 'FuncButtonDown'){Btn.className = 'FuncButtonUp';}
}

function FuncBtnOut(Btn){
	Btn.className = 'FuncButton';
}

function FuncBtnDown(Btn){
	Btn.className = 'FuncButtonDown';
}

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');
	ShowElements(true, 'object', 'FeedbackContent');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
}

function ShowElements(Show, TagName, ContainerToReverse){
// added third argument to allow objects in the feedback box to appear
//IE bug -- hide all the form elements that will show through the popup
//FF on Mac bug : doesn't redisplay objects whose visibility is set to visible
//unless the object's display property is changed

	//get container object (by Id passed in, or use document otherwise)
	TopNode = document.getElementById(ContainerToReverse);
	var Els;
	if (TopNode != null) {
		Els = TopNode.getElementsByTagName(TagName);
	} else {
		Els = document.getElementsByTagName(TagName);
	}

	for (var i=0; i<Els.length; i++){
		if (TagName == "object") {
			//manipulate object elements in all browsers
			if (Show == true){
				Els[i].style.visibility = 'visible';
				//get Mac FireFox to manipulate display, to force screen redraw
				if (C.mac && C.gecko) {Els[i].style.display = '';}
			}
			else{
				Els[i].style.visibility = 'hidden';
				if (C.mac && C.gecko) {Els[i].style.display = 'none';}
			}
		} 
		else {
			// tagName is either input or select (that is, Form Elements)
			// ie6 has a problem with Form elements, so manipulate those
			if (C.ie) {
				if (C.ieVer < 7) {
					if (Show == true){
						Els[i].style.visibility = 'visible';
					}
					else{
						Els[i].style.visibility = 'hidden';
					}
				}
			}
		}
	}
}



function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
	if (Finished == true){
		Finish();
	}
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].clientWidth;
	this.H = document.getElementsByTagName('body')[0].clientHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (typeof(window.pageYOffset) == 'number'){
		return window.pageYOffset;
	}
	else{
		if ((document.body)&&(document.body.scrollTop)){
			return document.body.scrollTop;
		}
		else{
			if ((document.documentElement)&&(document.documentElement.scrollTop)){
				return document.documentElement.scrollTop;
			}
			else{
				return 0;
			}
		}
	}
}

function GetViewportHeight(){
	if (typeof window.innerHeight != 'undefined'){
		return window.innerHeight;
	}
	else{
		if (((typeof document.documentElement != 'undefined')&&(typeof document.documentElement.clientHeight !=
     'undefined'))&&(document.documentElement.clientHeight != 0)){
			return document.documentElement.clientHeight;
		}
		else{
			return document.getElementsByTagName('body')[0].clientHeight;
		}
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	if (C.ie) {
		thisKey = window.event.keyCode;
	}
	else {
		thisKey = e.keyCode;
	}

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
	}

	if (Suppress == true){
		if (C.ie){
			window.event.returnValue = false;	
			window.event.cancelBubble = true;
		}
		else{
			e.preventDefault();
		}
	}
}

if (C.ie){
	document.attachEvent('onkeydown',SuppressBackspace);
	window.attachEvent('onkeydown',SuppressBackspace);
}
else{
	if (window.addEventListener){
		window.addEventListener('keypress',SuppressBackspace,false);
	}
}

function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

}




function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}

//EXTENSION TO ARRAY OBJECT
function Array_IndexOf(Input){
	var Result = -1;
	for (var i=0; i<this.length; i++){
		if (this[i] == Input){
			Result = i;
		}
	}
	return Result;
}
Array.prototype.indexOf = Array_IndexOf;

//IE HAS RENDERING BUG WITH BOTTOM NAVBAR
function RemoveBottomNavBarForIE(){
	if ((C.ie)&&(document.getElementById('Reading') != null)){
		if (document.getElementById('BottomNavBar') != null){
			document.getElementById('TheBody').removeChild(document.getElementById('BottomNavBar'));
		}
	}
}




//HOTPOTNET-RELATED CODE

var HPNStartTime = (new Date()).getTime();
var SubmissionTimeout = 30000;
var Detail = ''; //Global that is used to submit tracking data

function Finish(){
//If there's a form, fill it out and submit it
	if (document.store != null){
		Frm = document.store;
		Frm.starttime.value = HPNStartTime;
		Frm.endtime.value = (new Date()).getTime();
		Frm.mark.value = Score;
		Frm.detail.value = Detail;
		Frm.submit();
	}
}




//JQUIZ-SPECIFIC SCORM-RELATED JAVASCRIPT CODE

function SetScormScore(){
//Reports the current score and any other information back to the LMS
	if (API != null){
		API.LMSSetValue('cmi.core.score.raw', Score);
//Now send detailed reports about each item
		for (var i=0; i<State.length; i++){
			if (State[i] != null){
				var ItemLabel = 'Item_' + (i+1).toString();
				var ThisItemScore = '';
				var ThisItemStatus = '';
				API.LMSSetValue('cmi.objectives.' + i + '.id', 'obj'+ItemLabel);
				API.LMSSetValue('cmi.interactions.' + i + '.id', 'int'+ItemLabel);
				API.LMSSetValue('cmi.objectives.' + i + '.score.min', '0');
				API.LMSSetValue('cmi.objectives.' + i + '.score.max', '100');
				if (State[i][2] > 0){
					ThisItemScore = Math.floor(State[i][0] * 100) + '';
					ThisItemStatus = 'completed';
				}
				else{
					ThisItemScore = '0';
					ThisItemStatus = 'incomplete';
				}
				API.LMSSetValue('cmi.objectives.' + i + '.score.raw', ThisItemScore);
				API.LMSSetValue('cmi.objectives.' + i + '.status', ThisItemStatus);
				API.LMSSetValue('cmi.interactions.' + i + '.weighting', I[i][0]);
//We can only use the performance type, because we're storing multiple responses of various types.
				API.LMSSetValue('cmi.interactions.' + i + '.type', 'performance');
				API.LMSSetValue('cmi.interactions.' + i + '.student_response', State[i][5]);
			}
		}
		
		API.LMSCommit('');
	}
}


//JQUIZ CORE JAVASCRIPT CODE

var CurrQNum = 0;
var CorrectIndicator = ':-)';
var IncorrectIndicator = 'X';
var YourScoreIs = 'Your score is ';

//New for 6.2.2.0
var CompletedSoFar = 'Questions completed so far: ';
var ExerciseCompleted = 'You have completed the exercise.';
var ShowCompletedSoFar = true;

var ContinuousScoring = true;
var CorrectFirstTime = 'Questions answered correctly first time: ';
var ShowCorrectFirstTime = true;
var ShuffleQs = false;
var ShuffleAs = false;
var DefaultRight = 'Correct!';
var DefaultWrong = 'Sorry! Try again.';
var QsToShow = 50;
var Score = 0;
var Finished = false;
var Qs = null;
var QArray = new Array();
var ShowingAllQuestions = false;
var ShowAllQuestionsCaption = 'Show all questions';
var ShowOneByOneCaption = 'Show questions one by one';
var State = new Array();
var Feedback = '';
var TimeOver = false;
var strInstructions = '';
var Locked = false;

//The following variable can be used to add a message explaining that
//the question is finished, so no further marking will take place.
var strQuestionFinished = '';

function CompleteEmptyFeedback(){
	var QNum, ANum;
	for (QNum=0; QNum<I.length; QNum++){
//Only do this if not multi-select
		if (I[QNum][2] != '3'){
  		for (ANum = 0; ANum<I[QNum][3].length; ANum++){
  			if (I[QNum][3][ANum][1].length < 1){
  				if (I[QNum][3][ANum][2] > 0){
  					I[QNum][3][ANum][1] = DefaultRight;
  				}
  				else{
  					I[QNum][3][ANum][1] = DefaultWrong;
  				}
  			}
  		}
		}
	}
}

function SetUpQuestions(){
	var AList = new Array(); 
	var QList = new Array();
	var i, j;
	Qs = document.getElementById('Questions');
	while (Qs.getElementsByTagName('li').length > 0){
		QList.push(Qs.removeChild(Qs.getElementsByTagName('li')[0]));
	}
	var DumpItem = 0;
	if (QsToShow > QList.length){
		QsToShow = QList.length;
	}
	while (QsToShow < QList.length){
		DumpItem = Math.floor(QList.length*Math.random());
		for (j=DumpItem; j<(QList.length-1); j++){
			QList[j] = QList[j+1];
		}
		QList.length = QList.length-1;
	}
	if (ShuffleQs == true){
		QList = Shuffle(QList);
	}
	if (ShuffleAs == true){
		var As;
		for (var i=0; i<QList.length; i++){
			As = QList[i].getElementsByTagName('ol')[0];
			if (As != null){
  			AList.length = 0;
				while (As.getElementsByTagName('li').length > 0){
					AList.push(As.removeChild(As.getElementsByTagName('li')[0]));
				}
				AList = Shuffle(AList);
				for (j=0; j<AList.length; j++){
					As.appendChild(AList[j]);
				}
			}
		}
	}
	
	for (i=0; i<QList.length; i++){
		Qs.appendChild(QList[i]);
		QArray[QArray.length] = QList[i];
	}

//Show the first item
	QArray[0].style.display = '';
	
//Now hide all except the first item
	for (i=1; i<QArray.length; i++){
		QArray[i].style.display = 'none';
	}		
	SetQNumReadout();
	
	SetFocusToTextbox();
}

function SetFocusToTextbox(){
//if there's a textbox, set the focus in it
	if (QArray[CurrQNum].getElementsByTagName('input')[0] != null){
		QArray[CurrQNum].getElementsByTagName('input')[0].focus();
//and show a keypad if there is one
		if (document.getElementById('CharacterKeypad') != null){
			document.getElementById('CharacterKeypad').style.display = 'block';
		}
	}
	else{
  	if (QArray[CurrQNum].getElementsByTagName('textarea')[0] != null){
  		QArray[CurrQNum].getElementsByTagName('textarea')[0].focus();	
//and show a keypad if there is one
			if (document.getElementById('CharacterKeypad') != null){
				document.getElementById('CharacterKeypad').style.display = 'block';
			}
		}
//This added for 6.0.4.11: hide accented character buttons if no textbox
		else{
			if (document.getElementById('CharacterKeypad') != null){
				document.getElementById('CharacterKeypad').style.display = 'none';
			}
		}
	}
}

function ChangeQ(ChangeBy){
//The following line prevents moving to another question until the current
//question is answered correctly. Uncomment it to enable this behaviour. 
//	if (State[CurrQNum][0] == -1){return;}
	if (((CurrQNum + ChangeBy) < 0)||((CurrQNum + ChangeBy) >= QArray.length)){return;}
	QArray[CurrQNum].style.display = 'none';
	CurrQNum += ChangeBy;
	QArray[CurrQNum].style.display = '';
//Undocumented function added 10/12/2004
	ShowSpecialReadingForQuestion();
	SetQNumReadout();
	SetFocusToTextbox();
}

var HiddenReadingShown = false;
function ShowSpecialReadingForQuestion(){
//Undocumented function for showing specific reading text elements which change with each question
//Added on 10/12/2004
	if (document.getElementById('ReadingDiv') != null){
		if (HiddenReadingShown == true){
			document.getElementById('ReadingDiv').innerHTML = '';
		}
		if (QArray[CurrQNum] != null){
//Fix for 6.0.4.25
			var Children = QArray[CurrQNum].getElementsByTagName('div');
			for (var i=0; i<Children.length; i++){
			if (Children[i].className=="HiddenReading"){
					document.getElementById('ReadingDiv').innerHTML = Children[i].innerHTML;
					HiddenReadingShown = true;
//Hide the ShowAllQuestions button to avoid confusion
					if (document.getElementById('ShowMethodButton') != null){
						document.getElementById('ShowMethodButton').style.display = 'none';
					}
				}
			}	
		}
	}
}

function SetQNumReadout(){
	document.getElementById('QNumReadout').innerHTML = (CurrQNum+1) + ' / ' + QArray.length;
	if ((CurrQNum+1) >= QArray.length){
		if (document.getElementById('NextQButton') != null){
			document.getElementById('NextQButton').style.visibility = 'hidden';
		}
	}
	else{
		if (document.getElementById('NextQButton') != null){
			document.getElementById('NextQButton').style.visibility = 'visible';
		}
	}
	if (CurrQNum <= 0){
		if (document.getElementById('PrevQButton') != null){
			document.getElementById('PrevQButton').style.visibility = 'hidden';
		}
	}
	else{
		if (document.getElementById('PrevQButton') != null){
			document.getElementById('PrevQButton').style.visibility = 'visible';
		}
	}
}

var I=new Array();
I[0]=new Array();I[0][0]=100;
I[0][1]='';
I[0][2]='0';
I[0][3]=new Array();
I[0][3][0]=new Array('51','',1,100,1);
I[0][3][1]=new Array('49','',0,0,1);
I[0][3][2]=new Array('50','',0,0,1);
I[0][3][3]=new Array('100','',0,0,1);
I[1]=new Array();I[1][0]=100;
I[1][1]='';
I[1][2]='0';
I[1][3]=new Array();
I[1][3][0]=new Array('Jan Smuts','',0,0,1);
I[1][3][1]=new Array('Theodore Roosevelt','',0,0,1);
I[1][3][2]=new Array('Woodrow Wilson','',0,0,1);
I[1][3][3]=new Array('Leonard Woolf','',1,100,1);
I[2]=new Array();I[2][0]=100;
I[2][1]='';
I[2][2]='0';
I[2][3]=new Array();
I[2][3][0]=new Array('Lord Byron','',0,0,1);
I[2][3][1]=new Array('Leonard Woolf','',0,0,1);
I[2][3][2]=new Array('H.G. Wells','',1,100,1);
I[2][3][3]=new Array('Leon Auguste Bourgeois','',0,0,1);
I[3]=new Array();I[3][0]=100;
I[3][1]='';
I[3][2]='0';
I[3][3]=new Array();
I[3][3][0]=new Array('the International Government','',0,0,1);
I[3][3][1]=new Array('the League of Nations','',1,100,1);
I[3][3][2]=new Array('the Associated Nations','',0,0,1);
I[3][3][3]=new Array('the World Council','',0,0,1);
I[4]=new Array();I[4][0]=100;
I[4][1]='';
I[4][2]='0';
I[4][3]=new Array();
I[4][3][0]=new Array('Woodrow Wilson','',0,0,1);
I[4][3][1]=new Array('Theodore Roosevelt','',0,0,1);
I[4][3][2]=new Array('Franklin Roosevelt','',1,100,1);
I[4][3][3]=new Array('Harry Truman','',0,0,1);
I[5]=new Array();I[5][0]=100;
I[5][1]='';
I[5][2]='0';
I[5][3]=new Array();
I[5][3][0]=new Array('large nations have more votes than small nations','',0,0,1);
I[5][3][1]=new Array('large nations can vote, but not small nations','',0,0,1);
I[5][3][2]=new Array('large nations and small nations have equal voting power','',1,100,1);
I[5][3][3]=new Array('small nations can have more voting power than large nations','',0,0,1);
I[6]=new Array();I[6][0]=100;
I[6][1]='';
I[6][2]='0';
I[6][3]=new Array();
I[6][3][0]=new Array('15 rotating members with one-year terms','',0,0,1);
I[6][3][1]=new Array('10 rotating members with two-year terms','',1,100,1);
I[6][3][2]=new Array('12 permanent members, each with five-year terms','',0,0,1);
I[6][3][3]=new Array('no rotating members','',0,0,1);
I[7]=new Array();I[7][0]=100;
I[7][1]='';
I[7][2]='0';
I[7][3]=new Array();
I[7][3][0]=new Array('Dumbarton Oaks, Washington D.C.','',1,100,1);
I[7][3][1]=new Array('The Palace of Nations, Geneva','',0,0,1);
I[7][3][2]=new Array('The US Mission to International Organizations, Vienna','',0,0,1);
I[7][3][3]=new Array('Harvard University, Boston','',0,0,1);
I[8]=new Array();I[8][0]=100;
I[8][1]='';
I[8][2]='0';
I[8][3]=new Array();
I[8][3][0]=new Array('the General Assembly','',0,0,1);
I[8][3][1]=new Array('the Security Council','',1,100,1);
I[8][3][2]=new Array('the International Court of Justice','',0,0,1);
I[8][3][3]=new Array('the Trusteeship Council','',0,0,1);
I[9]=new Array();I[9][0]=100;
I[9][1]='';
I[9][2]='0';
I[9][3]=new Array();
I[9][3][0]=new Array('non-binding','',0,0,1);
I[9][3][1]=new Array('binding','',1,100,1);
I[9][3][2]=new Array('partially binding','',0,0,1);
I[9][3][3]=new Array('only recommendations','',0,0,1);
I[10]=new Array();I[10][0]=100;
I[10][1]='';
I[10][2]='0';
I[10][3]=new Array();
I[10][3][0]=new Array('poem by William Shakespeare','',0,0,1);
I[10][3][1]=new Array('poem by Lord Byron','',1,100,1);
I[10][3][2]=new Array('book by Leonard Woolf','',0,0,1);
I[10][3][3]=new Array('song by Pablo Casals','',0,0,1);
I[11]=new Array();I[11][0]=100;
I[11][1]='';
I[11][2]='0';
I[11][3]=new Array();
I[11][3][0]=new Array('Jan Smuts','',0,0,1);
I[11][3][1]=new Array('Franklin Roosevelt','',0,0,1);
I[11][3][2]=new Array('H.G. Wells','',0,0,1);
I[11][3][3]=new Array('Leon Auguste Bourgeois','',1,100,1);
I[12]=new Array();I[12][0]=100;
I[12][1]='';
I[12][2]='0';
I[12][3]=new Array();
I[12][3][0]=new Array('five','',0,0,1);
I[12][3][1]=new Array('seven','',0,0,1);
I[12][3][2]=new Array('six','',1,100,1);
I[12][3][3]=new Array('thirty-eight','',0,0,1);
I[13]=new Array();I[13][0]=100;
I[13][1]='';
I[13][2]='0';
I[13][3]=new Array();
I[13][3][0]=new Array('yes','',0,0,1);
I[13][3][1]=new Array('no','',1,100,1);
I[13][3][2]=new Array('sometimes','',0,0,1);
I[13][3][3]=new Array('only if the resolution is binding','',0,0,1);
I[14]=new Array();I[14][0]=100;
I[14][1]='';
I[14][2]='0';
I[14][3]=new Array();
I[14][3][0]=new Array('15 June, 1845','',0,0,1);
I[14][3][1]=new Array('24 October 1945','',1,100,1);
I[14][3][2]=new Array('16 July 1946','',0,0,1);
I[14][3][3]=new Array('21 September 1946','',0,0,1);
I[15]=new Array();I[15][0]=100;
I[15][1]='';
I[15][2]='0';
I[15][3]=new Array();
I[15][3][0]=new Array('Secretary-General Kofi Annan','',0,0,1);
I[15][3][1]=new Array('Secretary-General Dag Hammarskjold','',0,0,1);
I[15][3][2]=new Array('Secretary-General Trygve Lie','',0,0,1);
I[15][3][3]=new Array('Secretary-General U Thant','',1,100,1);
I[16]=new Array();I[16][0]=100;
I[16][1]='';
I[16][2]='0';
I[16][3]=new Array();
I[16][3][0]=new Array('Secretary-General Kofi Annan','',0,0,1);
I[16][3][1]=new Array('Secretary-General Boutros Boutros-Ghali','',0,0,1);
I[16][3][2]=new Array('Stephen Schlesinger, author','',1,100,1);
I[16][3][3]=new Array('Shashi Tharoor, Under-Secretary-General','',0,0,1);
I[17]=new Array();I[17][0]=100;
I[17][1]='';
I[17][2]='0';
I[17][3]=new Array();
I[17][3][0]=new Array('the capital of Timor Leste','',0,0,1);
I[17][3][1]=new Array('the great temples of Cambodia','',1,100,1);
I[17][3][2]=new Array('the capital of Cambodia','',0,0,1);
I[17][3][3]=new Array('a great city in Sudan','',0,0,1);
I[18]=new Array();I[18][0]=100;
I[18][1]='';
I[18][2]='0';
I[18][3]=new Array();
I[18][3][0]=new Array('train local citizens in more efficient farming methods','',0,0,1);
I[18][3][1]=new Array('train local people to vote in the first free elections','',1,100,1);
I[18][3][2]=new Array('teach people how to read','',0,0,1);
I[18][3][3]=new Array('teach people to be translators','',0,0,1);
I[19]=new Array();I[19][0]=100;
I[19][1]='';
I[19][2]='0';
I[19][3]=new Array();
I[19][3][0]=new Array('no child under 18 should be forced into the military','',1,100,1);
I[19][3][1]=new Array('only females under 18 should not be compelled to fight in the military','',0,0,1);
I[19][3][2]=new Array('child soldiers cannot be rehabilitated','',0,0,1);
I[19][3][3]=new Array('child soldiers should not be disarmed','',0,0,1);
I[20]=new Array();I[20][0]=100;
I[20][1]='';
I[20][2]='0';
I[20][3]=new Array();
I[20][3][0]=new Array('Lord Byron','',0,0,1);
I[20][3][1]=new Array('Isabelle Balot','',0,0,1);
I[20][3][2]=new Array('Shashi Tharoor','',1,100,1);
I[20][3][3]=new Array('H.G. Wells','',0,0,1);
I[21]=new Array();I[21][0]=100;
I[21][1]='';
I[21][2]='0';
I[21][3]=new Array();
I[21][3][0]=new Array('UNICEF','',0,0,1);
I[21][3][1]=new Array('UNESCO','',0,0,1);
I[21][3][2]=new Array('UNDP','',0,0,1);
I[21][3][3]=new Array('UNHCR','',1,100,1);
I[22]=new Array();I[22][0]=100;
I[22][1]='';
I[22][2]='0';
I[22][3]=new Array();
I[22][3][0]=new Array('35 million','',0,0,1);
I[22][3][1]=new Array('20 million','',1,100,1);
I[22][3][2]=new Array('17.5 million','',0,0,1);
I[22][3][3]=new Array('nearly 8 million','',0,0,1);
I[23]=new Array();I[23][0]=100;
I[23][1]='';
I[23][2]='0';
I[23][3]=new Array();
I[23][3][0]=new Array('build a refugee Center in Tanzania','',0,0,1);
I[23][3][1]=new Array('build a movie theater in Kosovo','',0,0,1);
I[23][3][2]=new Array('build a school for girls in Kenya','',1,100,1);
I[23][3][3]=new Array('build a school for girls in the Democratic Republic of the Congo','',0,0,1);
I[24]=new Array();I[24][0]=100;
I[24][1]='';
I[24][2]='0';
I[24][3]=new Array();
I[24][3][0]=new Array('AIDS awareness','',1,100,1);
I[24][3][1]=new Array('girls\' education','',0,0,1);
I[24][3][2]=new Array('anti-smoking awareness','',0,0,1);
I[24][3][3]=new Array('doing sports, not drugs','',0,0,1);
I[25]=new Array();I[25][0]=100;
I[25][1]='';
I[25][2]='0';
I[25][3]=new Array();
I[25][3][0]=new Array('school in the Congo','',1,100,1);
I[25][3][1]=new Array('refugee center in Tanzania','',0,0,1);
I[25][3][2]=new Array('hospital in the Congo','',0,0,1);
I[25][3][3]=new Array('community center in Kinshasa','',0,0,1);
I[26]=new Array();I[26][0]=100;
I[26][1]='';
I[26][2]='0';
I[26][3]=new Array();
I[26][3][0]=new Array('The disputing parties must destroy their weapons','',0,0,1);
I[26][3][1]=new Array('The disputing parties must de-mine all land mines','',0,0,1);
I[26][3][2]=new Array('The disputing parties must respect humanitarian norms','',1,100,1);
I[26][3][3]=new Array('The disputing parties must promise never to fight again','',0,0,1);
I[27]=new Array();I[27][0]=100;
I[27][1]='';
I[27][2]='0';
I[27][3]=new Array();
I[27][3][0]=new Array('9 out of 15 Security Council members vote in favour of it, including one permanent member','',0,0,1);
I[27][3][1]=new Array('9 out of 15 Security Council members vote in favour of it, including two permanent members','',0,0,1);
I[27][3][2]=new Array('9 out of 15 Security Council members vote in favour of it and no permanent member vetoes it','',1,100,1);
I[27][3][3]=new Array('9 out of 15 Security Council members vote in favour of it and only one permanent member vetoes it','',0,0,1);
I[28]=new Array();I[28][0]=100;
I[28][1]='';
I[28][2]='0';
I[28][3]=new Array();
I[28][3][0]=new Array('2004 to 2014','',0,0,1);
I[28][3][1]=new Array('2000 to 2010','',0,0,1);
I[28][3][2]=new Array('1994 to 2004','',0,0,1);
I[28][3][3]=new Array('2003 to 2012','',1,100,1);
I[29]=new Array();I[29][0]=100;
I[29][1]='';
I[29][2]='0';
I[29][3]=new Array();
I[29][3][0]=new Array('Two thirds of the world population','',0,0,1);
I[29][3][1]=new Array('1 billion','',0,0,1);
I[29][3][2]=new Array('860 million','',1,100,1);
I[29][3][3]=new Array('520 million','',0,0,1);
I[30]=new Array();I[30][0]=100;
I[30][1]='';
I[30][2]='0';
I[30][3]=new Array();
I[30][3][0]=new Array('One third','',0,0,1);
I[30][3][1]=new Array('More than half','',0,0,1);
I[30][3][2]=new Array('Three fourths','',0,0,1);
I[30][3][3]=new Array('Two thirds','',1,100,1);
I[31]=new Array();I[31][0]=100;
I[31][1]='';
I[31][2]='0';
I[31][3]=new Array();
I[31][3][0]=new Array('shopping for themselves','',0,0,1);
I[31][3][1]=new Array('educating themselves','',0,0,1);
I[31][3][2]=new Array('educating their children','',1,100,1);
I[31][3][3]=new Array('educating their husbands','',0,0,1);
I[32]=new Array();I[32][0]=100;
I[32][1]='';
I[32][2]='0';
I[32][3]=new Array();
I[32][3][0]=new Array('42,000','',0,0,1);
I[32][3][1]=new Array('1 million','',0,0,1);
I[32][3][2]=new Array('10 million','',0,0,1);
I[32][3][3]=new Array('42 million','',1,100,1);
I[33]=new Array();I[33][0]=100;
I[33][1]='';
I[33][2]='0';
I[33][3]=new Array();
I[33][3][0]=new Array('2001','',0,0,1);
I[33][3][1]=new Array('1999','',0,0,1);
I[33][3][2]=new Array('2000','',1,100,1);
I[33][3][3]=new Array('1991','',0,0,1);
I[34]=new Array();I[34][0]=100;
I[34][1]='';
I[34][2]='0';
I[34][3]=new Array();
I[34][3][0]=new Array('warfare itself','',1,100,1);
I[34][3][1]=new Array('other diseases','',0,0,1);
I[34][3][2]=new Array('many weapons of mass destruction','',0,0,1);
I[34][3][3]=new Array('drought','',0,0,1);
I[35]=new Array();I[35][0]=100;
I[35][1]='';
I[35][2]='0';
I[35][3]=new Array();
I[35][3][0]=new Array('10 million','',0,0,1);
I[35][3][1]=new Array('nearly 50,000','',0,0,1);
I[35][3][2]=new Array('nearly 500,000','',0,0,1);
I[35][3][3]=new Array('13 million','',1,100,1);
I[36]=new Array();I[36][0]=100;
I[36][1]='';
I[36][2]='0';
I[36][3]=new Array();
I[36][3][0]=new Array('sends UN experts to high AIDS-infected areas make speeches about AIDS statisitics directly to local people','',0,0,1);
I[36][3][1]=new Array('compels people of high AIDS-infected regions to be tested','',0,0,1);
I[36][3][2]=new Array('trains hairdressers to insert information about AIDS testing and treatment to their clients','',1,100,1);
I[36][3][3]=new Array('compels local people of high AIDS-infected regions to tell neighbours when they are tested for AIDS','',0,0,1);
I[37]=new Array();I[37][0]=100;
I[37][1]='';
I[37][2]='0';
I[37][3]=new Array();
I[37][3][0]=new Array('promoting tourism to those villages','',0,0,1);
I[37][3][1]=new Array('promoting micro-credit cooperatives in those villages','',1,100,1);
I[37][3][2]=new Array('buying the crafts at very high prices','',0,0,1);
I[37][3][3]=new Array('putting children to work selling crafts','',0,0,1);
I[38]=new Array();I[38][0]=100;
I[38][1]='';
I[38][2]='0';
I[38][3]=new Array();
I[38][3][0]=new Array('five different areas','',0,0,1);
I[38][3][1]=new Array('ten different areas','',0,0,1);
I[38][3][2]=new Array('no less than 100 different areas','',0,0,1);
I[38][3][3]=new Array('eight different areas','',1,100,1);
I[39]=new Array();I[39][0]=100;
I[39][1]='';
I[39][2]='0';
I[39][3]=new Array();
I[39][3][0]=new Array('decrease by half the number of children who go to school by 2015','',0,0,1);
I[39][3][1]=new Array('increase by half the number of children who go to school by 2005','',0,0,1);
I[39][3][2]=new Array('make sure that all children have access to secondary education by 2005','',0,0,1);
I[39][3][3]=new Array('make sure all children have access to primary and secondary education by 2015','',1,100,1);
I[40]=new Array();I[40][0]=100;
I[40][1]='';
I[40][2]='0';
I[40][3]=new Array();
I[40][3][0]=new Array('developing global partnerships for development','',0,0,1);
I[40][3][1]=new Array('making sure all people have a minimum of 1860 calories daily by 2015','',1,100,1);
I[40][3][2]=new Array('improving the health of mothers','',0,0,1);
I[40][3][3]=new Array('eradicating extreme poverty','',0,0,1);
I[41]=new Array();I[41][0]=100;
I[41][1]='';
I[41][2]='0';
I[41][3]=new Array();
I[41][3][0]=new Array('Columbia University','',1,100,1);
I[41][3][1]=new Array('New York University','',0,0,1);
I[41][3][2]=new Array('Harvard University','',0,0,1);
I[41][3][3]=new Array('Cambridge University','',0,0,1);
I[42]=new Array();I[42][0]=100;
I[42][1]='';
I[42][2]='0';
I[42][3]=new Array();
I[42][3][0]=new Array('50 million','',0,0,1);
I[42][3][1]=new Array('50 billion','',0,0,1);
I[42][3][2]=new Array('125 million','',0,0,1);
I[42][3][3]=new Array('125 billion','',1,100,1);
I[43]=new Array();I[43][0]=100;
I[43][1]='';
I[43][2]='0';
I[43][3]=new Array();
I[43][3][0]=new Array('forewarn of military invasions','',0,0,1);
I[43][3][1]=new Array('forewarn of natural disasters','',1,100,1);
I[43][3][2]=new Array('aid in practice military maneuvers','',0,0,1);
I[43][3][3]=new Array('stop natural disasters','',0,0,1);
I[44]=new Array();I[44][0]=100;
I[44][1]='';
I[44][2]='0';
I[44][3]=new Array();
I[44][3][0]=new Array('to provide multi-media entertainment in local theaters','',0,0,1);
I[44][3][1]=new Array('to provide multi-media art exhibits in local museums','',0,0,1);
I[44][3][2]=new Array('to aid teachers in creating multi-media lessons for their classes','',1,100,1);
I[44][3][3]=new Array('to prepare students to take trips to outer space','',0,0,1);
I[45]=new Array();I[45][0]=100;
I[45][1]='';
I[45][2]='0';
I[45][3]=new Array();
I[45][3][0]=new Array('preserve mainly great cultural landmarks','',0,0,1);
I[45][3][1]=new Array('to preserve only great natural wonders','',0,0,1);
I[45][3][2]=new Array('to preserve both great cultural and natural wonders','',1,100,1);
I[45][3][3]=new Array('to teach individauls more about their family history','',0,0,1);
I[46]=new Array();I[46][0]=100;
I[46][1]='';
I[46][2]='0';
I[46][3]=new Array();
I[46][3][0]=new Array('1972','',1,100,1);
I[46][3][1]=new Array('1952','',0,0,1);
I[46][3][2]=new Array('1945','',0,0,1);
I[46][3][3]=new Array('2000','',0,0,1);
I[47]=new Array();I[47][0]=100;
I[47][1]='';
I[47][2]='0';
I[47][3]=new Array();
I[47][3][0]=new Array('The Great Barrier Reef in Australia','',0,0,1);
I[47][3][1]=new Array('the Eiffel Tower in France','',1,100,1);
I[47][3][2]=new Array('the Grand Canyon in Arizona','',0,0,1);
I[47][3][3]=new Array('the University of Virginia campus','',0,0,1);
I[48]=new Array();I[48][0]=100;
I[48][1]='';
I[48][2]='0';
I[48][3]=new Array();
I[48][3][0]=new Array('conferred the greatest benefit on mankind','',1,100,1);
I[48][3][1]=new Array('increased education for all','',0,0,1);
I[48][3][2]=new Array('tried to put an end to all wars','',0,0,1);
I[48][3][3]=new Array('promoted gender equality','',0,0,1);
I[49]=new Array();I[49][0]=100;
I[49][1]='';
I[49][2]='0';
I[49][3]=new Array();
I[49][3][0]=new Array('on the hundredth anniversary of the Nobel Peace Prize, itself','',1,100,1);
I[49][3][1]=new Array('on the fifty-fifth anniversary of the United Nations','',0,0,1);
I[49][3][2]=new Array('on the fifty-fifth anniversary of Unicef','',0,0,1);
I[49][3][3]=new Array('on the birthday of Alfred Nobel, who instituted the prize','',0,0,1);


function StartUp(){
	RemoveBottomNavBarForIE();

//If there's only one question, no need for question navigation controls
	if (QsToShow < 2){
		document.getElementById('QNav').style.display = 'none';
	}
	
//Stash the instructions so they can be redisplayed
	strInstructions = document.getElementById('InstructionsDiv').innerHTML;
	

	ScormStartUp();

	

	

	
	CompleteEmptyFeedback();

	SetUpQuestions();
	ClearTextBoxes();
	CreateStatusArray();
	

	
//Check search string for q parameter
	if (document.location.search.length > 0){
		if (ShuffleQs == false){
			var JumpTo = parseInt(document.location.search.substring(1,document.location.search.length))-1;
			if (JumpTo <= QsToShow){
				ChangeQ(JumpTo);
			}
		}
	}
//Undocumented function added 10/12/2004
	ShowSpecialReadingForQuestion();
}

function ShowHideQuestions(){
	FuncBtnOut(document.getElementById('ShowMethodButton'));
	document.getElementById('ShowMethodButton').style.display = 'none';
	if (ShowingAllQuestions == false){
		for (var i=0; i<QArray.length; i++){
				QArray[i].style.display = '';
			}
		document.getElementById('Questions').style.listStyleType = 'decimal';
		document.getElementById('OneByOneReadout').style.display = 'none';
		document.getElementById('ShowMethodButton').innerHTML = ShowOneByOneCaption;
		ShowingAllQuestions = true;
	}
	else{
		for (var i=0; i<QArray.length; i++){
				if (i != CurrQNum){
					QArray[i].style.display = 'none';
				}
			}
		document.getElementById('Questions').style.listStyleType = 'none';
		document.getElementById('OneByOneReadout').style.display = '';
		document.getElementById('ShowMethodButton').innerHTML = ShowAllQuestionsCaption;
		ShowingAllQuestions = false;	
	}
	document.getElementById('ShowMethodButton').style.display = 'inline';
}

function CreateStatusArray(){
	var QNum, ANum;
//For each item in the item array
	for (QNum=0; QNum<I.length; QNum++){
//Check if the question still exists (hasn't been nuked by showing a random selection)
		if (document.getElementById('Q_' + QNum) != null){
			State[QNum] = new Array();
			State[QNum][0] = -1; //Score for this q; -1 shows question not done yet
			State[QNum][1] = new Array(); //answers
			for (ANum = 0; ANum<I[QNum][3].length; ANum++){
				State[QNum][1][ANum] = 0; //answer not chosen yet; when chosen, will store its position in the series of choices
			}
			State[QNum][2] = 0; //tries at this q so far
			State[QNum][3] = 0; //incrementing percent-correct values of selected answers
			State[QNum][4] = 0; //penalties incurred for hints
			State[QNum][5] = ''; //Sequence of answers chosen by number
		}
		else{
			State[QNum] = null;
		}
	}
}



function CheckMCAnswer(QNum, ANum, Btn){
//if question doesn't exist, bail
	if (State[QNum].length < 1){return;}
	
//Get the feedback
	Feedback = I[QNum][3][ANum][1];
	
//Now show feedback and bail if question already complete
	if (State[QNum][0] > -1){
//Add an extra message explaining that the question
// is finished if defined by the user
		if (strQuestionFinished.length > 0){Feedback += '<br />' + strQuestionFinished;}
//Show the feedback
		ShowMessage(Feedback);
//New for 6.2.2.1: If you want to mark an answer as correct even when it's the final choice, uncomment this line.
//		if (I[QNum][3][ANum][2] >= 1){Btn.innerHTML = CorrectIndicator;}else{Btn.innerHTML = IncorrectIndicator;}	
		return;
	}
	
//Hide the button while processing
	Btn.style.display = 'none';

//Increment the number of tries
	State[QNum][2]++;
	
//Add the percent-correct value of this answer
	State[QNum][3] += I[QNum][3][ANum][3];
	
//Store the try number in the answer part of the State array, for tracking purposes
	State[QNum][1][ANum] = State[QNum][2];
	if (State[QNum][5].length > 0){State[QNum][5] += ' | ';}
	State[QNum][5] += String.fromCharCode(65+ANum);
	
//Should this answer be accepted as correct?
	if (I[QNum][3][ANum][2] < 1){
//It's wrong

//Mark the answer
		Btn.innerHTML = IncorrectIndicator;
		
//Remove any previous score unless exercise is finished (6.0.3.8+)
		if (Finished == false){
			WriteToInstructions(strInstructions);
		}	
		
//Check whether this leaves just one MC answer unselected, in which case the Q is terminated
		var RemainingAnswer = FinalAnswer(QNum);
		if (RemainingAnswer > -1){
//Behave as if the last answer had been selected, but give no credit for it
//Increment the number of tries
			State[QNum][2]++;		
		
//Calculate the score for this question
			CalculateMCQuestionScore(QNum);
			
//Get the overall score and add it to the feedback
			CalculateOverallScore();
//New for 6.2.2.1
			var QsDone = CheckQuestionsCompleted();
			if ((ContinuousScoring == true)||(Finished == true)){
				Feedback += '<br />' + YourScoreIs + ' ' + Score + '%.' + '<br />' + QsDone;
				WriteToInstructions(YourScoreIs + ' ' + Score + '%.' + '<br />' + QsDone);
			}
			else{
				WriteToInstructions(QsDone);
			}
		}
	}
	else{
//It's right
//Mark the answer
		Btn.innerHTML = CorrectIndicator;
				
//Calculate the score for this question
		CalculateMCQuestionScore(QNum);
		
//New for 6.2.2.0
		var QsDone = CheckQuestionsCompleted();

//Get the overall score and add it to the feedback
		if (ContinuousScoring == true){
			CalculateOverallScore();
			if ((ContinuousScoring == true)||(Finished == true)){
				Feedback += '<br />' + YourScoreIs + ' ' + Score + '%.' + '<br />' + QsDone;
				WriteToInstructions(YourScoreIs + ' ' + Score + '%.' + '<br />' + QsDone);
			}
		}
		else{
			WriteToInstructions(QsDone);
		}
	}
	
//Show the button again
	Btn.style.display = 'inline';
	
//Finally, show the feedback	
	ShowMessage(Feedback);
	
//Check whether all questions are now done
	CheckFinished();
}

function CalculateMCQuestionScore(QNum){
	var Tries = State[QNum][2] + State[QNum][4]; //include tries and hint penalties
	var PercentCorrect = State[QNum][3];
	var TotAns = GetTotalMCAnswers(QNum);
	var HintPenalties = State[QNum][4];
	
//Make sure it's not already complete

	if (State[QNum][0] < 0){
//Allow for Hybrids
		if (HintPenalties >= 1){
			State[QNum][0] = 0;
		}
		else{
//This line calculates the score for this question
			if (TotAns == 1){
				State[QNum][0] = 1;
			}
			else{
				State[QNum][0] = ((TotAns-((Tries*100)/State[QNum][3]))/(TotAns-1));
			}
		}
//Fix for Safari bug added for version 6.0.3.42 (negative infinity problem)
		if ((State[QNum][0] < 0)||(State[QNum][0] == Number.NEGATIVE_INFINITY)){
			State[QNum][0] = 0;
		}
	}
}

function GetTotalMCAnswers(QNum){
	var Result = 0;
	for (var ANum=0; ANum<I[QNum][3].length; ANum++){
		if (I[QNum][3][ANum][4] == 1){ //This is an MC answer
			Result++;
		}
	}
	return Result;
}

function FinalAnswer(QNum){
	var UnchosenAnswers = 0;
	var FinalAnswer = -1;
	for (var ANum=0; ANum<I[QNum][3].length; ANum++){
		if (I[QNum][3][ANum][4] == 1){ //This is an MC answer
			if (State[QNum][1][ANum] < 1){ //This answer hasn't been chosen yet
				UnchosenAnswers++;
				FinalAnswer = ANum;
			}
		}
	}
	if (UnchosenAnswers == 1){
		return FinalAnswer;
	}
	else{
		return -1;
	}
}





function CalculateOverallScore(){
	var TotalWeighting = 0;
	var TotalScore = 0;
	
	for (var QNum=0; QNum<State.length; QNum++){
		if (State[QNum] != null){
			if (State[QNum][0] > -1){
				TotalWeighting += I[QNum][0];
				TotalScore += (I[QNum][0] * State[QNum][0]);
			}
		}
	}
	if (TotalWeighting > 0){
		Score = Math.floor((TotalScore/TotalWeighting)*100);
	}
	else{
//if TotalWeighting is 0, no questions so far have any value, so 
//no penalty should be shown.
		Score = 100; 
	}
}

//New for 6.2.2.0
function CheckQuestionsCompleted(){
	if (ShowCompletedSoFar == false){return '';}
	var QsCompleted = 0;
	for (var QNum=0; QNum<State.length; QNum++){
		if (State[QNum] != null){
			if (State[QNum][0] >= 0){
				QsCompleted++;
			}
		}
	}
//Fixes for 6.2.2.2
	if (QsCompleted >= QArray.length){
		return ExerciseCompleted;
	}
	else{
		return CompletedSoFar + ' ' + QsCompleted + '/' + QArray.length + '.';
	}
}

function CheckFinished(){
	var FB = '';
	var AllDone = true;
	for (var QNum=0; QNum<State.length; QNum++){
		if (State[QNum] != null){
			if (State[QNum][0] < 0){
				AllDone = false;
			}
		}
	}
	if (AllDone == true){
	
//Report final score and submit if necessary
		CalculateOverallScore();
		FB = YourScoreIs + ' ' + Score + '%.';
		if (ShowCorrectFirstTime == true){
			var CFT = 0;
			for (QNum=0; QNum<State.length; QNum++){
				if (State[QNum] != null){
					if (State[QNum][0] >= 1){
						CFT++;
					}
				}
			}
			FB += '<br />' + CorrectFirstTime + ' ' + CFT + '/' + QsToShow;
		}
		
//New for 6.2.2.0
		FB += '<br />' + ExerciseCompleted;
		
		WriteToInstructions(FB);
		
		Finished == true;



		if (TimeOver == true){
			SetScormTimedOut();
		}
		else{
			SetScormComplete();
		}


		TimeOver = true;
		Locked = true;
		


		Finished = true;
		Detail = '<?xml version="1.0"?><hpnetresult><fields>';
		for (QNum=0; QNum<State.length; QNum++){
			if (State[QNum] != null){
				if (State[QNum][5].length > 0){
					Detail += '<field><fieldname>Question #' + (QNum+1) + '</fieldname><fieldtype>question-tracking</fieldtype><fieldlabel>Q ' + (QNum+1) + '</fieldlabel><fieldlabelid>QuestionTrackingField</fieldlabelid><fielddata>' + State[QNum][5] + '</fielddata></field>';
				}
			}
		}
		Detail += '</fields></hpnetresult>';
		setTimeout('Finish()', SubmissionTimeout);
	}

	else{
		SetScormIncomplete();
	}

}










//-->

//]]>


