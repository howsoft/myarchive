package b825saqs.q01;
	
import om.*;
import om.helper.SimpleQuestion1;

public class B825Question extends SimpleQuestion1
{ 
	private char correctAnswer = 'c';
	
	protected boolean isRight(int iAttempt) throws OmDeveloperException {
    	
		switch(iAttempt) {
			case 1:
			setFeedbackID("first_try");
			break;
			
			case 2:
			setFeedbackID("second_try");
			break;
			
			case 3:
			setFeedbackID("last_try");
			break;
		}
	
		
  		if(getRadioBox("box"+ correctAnswer).isChecked()) {
  			return true;
  		}
  		
  		
  		
  		return false;
	}
  
  public void actionOK() throws OmException {
		
		getComponent("answerbox").setDisplay(false);
		getComponent("inputbox").setDisplay(true);
		
		super.actionOK();
	} // end of actionOK() method
  
  public void actionSubmit() throws OmException {
		getComponent("inputbox").setDisplay(false);
		getComponent("answerbox").setDisplay(true);
		super.actionSubmit();
	}
  
  public void actionGiveUp() throws OmDeveloperException {
	  	getComponent("inputbox").setDisplay(false);
		super.actionGiveUp();
	}
  
} // end of class
