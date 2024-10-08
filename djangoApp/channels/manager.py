from django.db import models

class DebateManager(models.Manager):
    """Custom manager to introduce additional table level methods for Debate elements.

    """
    MAPPING_BUTTON_NR_TO_SCORE = {
        1: 0, # interested
        2: 1, # trust
        3: -1, # dont trust
        4: 1, # agree
        5: -1, # disagree
    }
    def pointsUserPutOnCard(self, voter: User, card: DebateCard):
        """Calculate the score, which is at the moment placed on the card `card`
        by the user `voter`.

        """
        querysetPointsOnCardUser = self.filter(voter=voter, card=card)
        
        score = 0
        for pointObj in querysetPointsOnCardUser: 
            score += self.MAPPING_BUTTON_NR_TO_SCORE[pointObj.type]

        return score
