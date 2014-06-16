package elephant.testing.q06;
	
import om.OmDeveloperException;
import om.OmException;
import om.helper.SimpleQuestion1;
import om.question.Results;
import om.stdcomponent.*;

public class Test extends SimpleQuestion1 {
		
	int score = 0;
		
	String [ ] startOrder = { 
		"a","b","c","d","e","f"
	};
		
		String [ ] correctOrder = {
		"f","e","d","c","b","a"
	};
		
	protected void setScore(boolean bRight, boolean bPass, int iAttempt) throws OmDeveloperException {
		getResults().setScore(this.score, iAttempt);
			
		if(bPass) {
			getResults().setScore(0, Results.ATTEMPTS_PASS);
		}
		else {
			getResults().setScore(Math.max(0, (this.score + 1) - iAttempt),iAttempt);
		}
		
	}
			
	protected boolean isRight(int iAttempt) throws OmDeveloperException
	{	
		/*
		 *  reset all checkboxes to hidden
		 */
		for(int i=0; i<startOrder.length; i++) {
			String checkbox = startOrder[i] + "_cb";
			getComponent(checkbox).setDisplay(false);
		}
			
		int numberCorrect = 0;
		int numberAttempted = 0;
			
		for(int i=0; i<startOrder.length; i++) {
			DropBoxComponent dbc = getDropBox(startOrder[i]);
			String dropped = dbc.getValue();
			if(!dropped.equals("")) {
				numberAttempted++;
				if(dropped.equals(correctOrder[i] + "1")) { // ids for the draggables are like a1, b1 etc.
					String checkbox = startOrder[i] + "_cb";
					getComponent(checkbox).setDisplay(true);
					numberCorrect++;
				}
				
			}
				
		}
			
		this.score = numberCorrect;
			
		String message = "You attempted " + numberAttempted + " part(s) of the question out of " + startOrder.length + "." +
		" " + numberCorrect + (numberCorrect == 1 ? " is" : " are") + " correct.";
			
		if(iAttempt < 3 && numberCorrect > 0) {
			message += " When you click OK, your correct answer(s) will remain in position. Any incorrect ones will return to their starting positions.";
		}
			
		getText("feedback").setText(message);
		setFeedbackID("feedback");
				
		if(numberCorrect == startOrder.length) {
			return true;
		}
			
		return false;
	}
	
	public void actionOK() throws OmException {
	// in here I want to put code to restore wrongly guessed dragged items
	// to their starting positions after the OK button in the feedback is clicked
	// calling the clear() method of the DropBoxComponent seems to achieve 
	// this.
		for(int i=0; i<startOrder.length; i++) {
			DropBoxComponent dbc = getDropBox(startOrder[i]);
			String dropped = dbc.getValue();
			if(!dropped.equals("")) {
				if(!dropped.equals(correctOrder[i] + "1")) { // ids for the draggables are like a1, b1 etc.
					dbc.clear();			
				}
				
			}
				
		}
					
		super.actionOK();
	} // end of actionOK() method
		
	} // end of class
	