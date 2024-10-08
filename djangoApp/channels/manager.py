from django.db import models

from common.models import User

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
    def pointsUserPutOnCard(self, voter: User, card: models.Model):
        """Calculate the score, which is at the moment placed on the card `card`
        by the user `voter`.

        """
        querysetPointsOnCardUser = self.filter(voter=voter, card=card)
        
        score = 0
        for pointObj in querysetPointsOnCardUser: 
            score += self.MAPPING_BUTTON_NR_TO_SCORE[pointObj.type]

        return score

    def checkIfPointCanBePlaced(self, voter: User, card: models.Model, type: int):
        """Check if the user can place one more debate point on the card. Reject 
        if te rejecting criterion is met.

        The accepting criterion at the moment is that the score sum of all placed
        points should be in the intervall [-1 ... 1].

        """
        
        oldSum = self.pointsUserPutOnCard(voter, card)
        newSum = oldSum + self.MAPPING_BUTTON_NR_TO_SCORE[type]

        if newSum <= 1 and newSum >= -1:
            return True

        return False

