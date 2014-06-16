package b825saqs.q02;
	
import om.OmDeveloperException;
import om.OmException;
import om.helper.SimpleQuestion1;
import om.stdcomponent.DropBoxComponent;


public class B825Question extends SimpleQuestion1 {
	
	/*
	 *  Assume that the draggable items are numbered from the top as a,b,c,d
	 *  The "answers" array is then the letters of each dragbox as laid
	 *  in their correct destinations.
	 *  For example, the dragboxes might start as:
	 *  A
	 *  B
	 *  C
	 *  D
	 *  and end up (in the dropboxes) as:
	 *  BD
	 *  CA
	 *  which would be represented in the "answers" array, similar to below:
	 */
	
	String [ ] answers = { 
			"d","b","c","a"
	};
	
	protected void doAdditionalAnswerProcessing(boolean bRight, boolean bWrong, boolean bPass, int iAttempt) throws OmDeveloperException {
		if(bRight) {
			getComponent("got_it_right").setDisplay(true);
		}
		if(bWrong && iAttempt == 3) {
			getComponent("always_wrong").setDisplay(true);
		}
	}
	
	public void showAnswer() throws OmException {
		
		for(int i=0; i<answers.length; i++) {
			String dropboxID = "" + ((char) (i + 97)); // adding 97 converts 0 to a, 1 to b etc.
			DropBoxComponent dbc = getDropBox(dropboxID);
			String dragboxID = answers[i] + answers[i];
			dbc.setValue(dragboxID);
			dbc.setEnabled(false);
		}
		
		getComponent("answerbox").setDisplay(false);	
		getComponent("inputbox").setDisplay(true);
		getComponent("inputbox").setEnabled(true);
		getComponent("continueButton").setDisplay(true);
		getComponent("submitButton").setDisplay(false);
		getComponent("skipButton").setDisplay(false);
		getComponent("instructions").setDisplay(false);
		getComponent("showanswer").setDisplay(true);
		
	}
	
	public void actionSubmit() throws OmException {
		getComponent("inputbox").setDisplay(false);
		getComponent("answerbox").setDisplay(true);
		super.actionSubmit();
	}
	
	public void actionGiveUp() throws OmDeveloperException {
		getComponent("inputbox").setDisplay(false);
		super.actionGiveUp();
	}
	
	protected boolean isRight(int iAttempt) throws OmDeveloperException
	{	
		int numberCorrect = 0;
		
		for(int i=0; i<answers.length; i++) {
			String dropboxID = "" + ((char) (i + 97)); // adding 97 converts 0 to a, 1 to b etc.
						
			String draggedID = getDropBox(dropboxID).getValue();
			if(!draggedID.equals("")) {
					if(draggedID.equals(answers[i] + answers[i])) { // dragged items have IDs like aa, bb, cc
						numberCorrect++;
					}
			}
			
		}
		
		switch(iAttempt) {
				case 1:
				setFeedbackID("first_try");
				break;
		
				case 2:
				setFeedbackID("second_try");
				break;
		}
		
		if(numberCorrect == answers.length) {
			return true;
		}
		
		return false;
	}
	
	public void actionOK() throws OmException {
		getComponent("answerbox").setDisplay(false);
		getComponent("inputbox").setDisplay(true);
		
		for(int i=0; i<answers.length; i++) {
			String dropBoxID = "" + ((char) (i + 97)); // adding 97 converts 0 to a, 1 to b etc.
			DropBoxComponent dbc = getDropBox(dropBoxID);
			String dropped = dbc.getValue();
			if(!dropped.equals("")) {
				if(!dropped.equals(answers[i] + answers[i])) {
					dbc.clear();
				}
			}
		}
	
		super.actionOK();
	}

	
} // end of class
