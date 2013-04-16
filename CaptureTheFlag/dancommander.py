from api import Commander
from api import commands
from api import Vector2
import math

class Dan(Commander):
	"""
	Currently a team of zombies that enter kill mode, wander out to get the flag, and wander back.
	"""

	def initialize(self):
		self.verbose = True
		self.log.info("Initialize...")
		
		#pathing tweak variables
		self.pathPrecision = 1
		self.wallRank = 1
		self.openSpaceRank = 10
		
		#grouping tweak varaibles
		self.defender_ratio = .3
		self.defense_squad = []
		
		#variables for clarity
		self.teamSize = len(self.game.team.members)
		self.enemyTeamSize = len(self.game.enemyTeam.members)
		self.ourScoreLocation = self.game.team.flagScoreLocation
		
		#assign some of the squad to be defenders
		#for i in range(self.teamSize - 1):
		#	if i % math.floor(1/self.defender_ratio):
		#		self.defense_squad.append(self.game.team.members[i])

	def tick(self):
		#set up scenarios
		
		#we got their flag
		#if self.gotEnemyFlag():
		#	blah = Null#placeholder
			
		#they got our flag
		#if self.ourFlagTaken():
		#	blah = Null#placeholder
			
		#our defenders ratio is off (they killed some of our defenders)
		
		
		#we killed all of them
		#need to count respawn times
		#need a way to calculate times for run distances
		
		#if we have the flag send all bots attacking toward the flag holder, and send the flag holder toward home
		if self.gotEnemyFlag():
			for bot in self.game.bots_available:
				if bot.flag != None:
					self.issue(commands.Attack, bot, self.ourScoreLocation, description = '-> return flag')
				else:
					self.issue(commands.Attack, bot, self.ourFlagCarrierPosition(), description = '<> flag returner')
		#else if we don't have the flag
		else:
			for bot in self.game.bots_available:
				self.issue(commands.Attack, bot, self.getWallHuggingPath(bot.position, self.getEnemyFlagPosition()), description = '-> their flag')
				#self.issue(commands.Attack, bot, self.getEnemyFlagPosition(), description = '-> their flag')

	def ourFlagCarrierPosition(self):
		return self.game.enemyTeam.flag.carrier.position

	def getEnemyFlagPosition(self):
		return self.game.enemyTeam.flag.position

	def gotEnemyFlag(self):
		"""Did this team cature the enemy flag?"""
		return self.game.enemyTeam.flag.carrier != None

	def getWallHuggingPath(self, start, destination):
		self.log.info("start position: [{0.x}, {0.y}]".format(start))
		self.log.info("end position: [{0.x}, {0.y}]".format(destination))
		destination = self.level.findNearestFreePosition(destination)
		result = list()
		
		closedSet = list()
		openSet = list()
		openSet.append(start)

		#gscore
		costToNodeFromStart = {}
		costToNodeFromStart[start] = 0
		
		#fscore
		estimatedTotalCostThroughNode = {}
		estimatedTotalCostThroughNode[start] = start.distance(destination)
	
		#backpath
		backpath = {}
		while len(openSet) > 0:
			openSetCosts = { vect: (costToNodeFromStart[vect] + vect.distance(destination)) for vect in openSet }
			current = sorted(openSet, key=openSetCosts.__getitem__, reverse=False)[0]
			if math.floor(current.x) == math.floor(destination.x) and math.floor(current.y) == math.floor(destination.y):
				result.append(destination)
				while current != start:
					result.insert(0, current)
					current = backpath[current]
				self.log.info(result)
				return result.reverse()
			
			openSet.remove(current)
			closedSet.append(current)
			
			adjacentTiles = self.getNearAvailableMapTiles(self.level.blockHeights, current, 1)
			
			for neighbor in adjacentTiles:#Sorted:
				if neighbor in closedSet:
					continue
				
				#determine if the current tile is along a wall
				tentativeScoreToTile = 0
				if self.tileIsWallAdjacent(self.level.blockHeights, neighbor, 1):
					tentativeScoreToTile = costToNodeFromStart[current] + current.distance(neighbor) * self.wallRank
				else:
					tentativeScoreToTile = costToNodeFromStart[current] + current.distance(neighbor) * self.openSpaceRank
				
				if neighbor not in openSet or neighbor not in costToNodeFromStart or tentativeScoreToTile <= costToNodeFromStart[neighbor]:
					backpath[neighbor] = current
					costToNodeFromStart[neighbor] = tentativeScoreToTile
					estimatedTotalCostThroughNode[neighbor] = tentativeScoreToTile + neighbor.distance(destination)
					if neighbor not in openSet:
						openSet.append(neighbor)
		
		self.log.info("Failure finding route")
		return destination#fall back to their system because mine can't work with this
	
	#this function returns all tiles within a given radius of the target tile
	#excluding tiles containing a block height greater than zero	
	def getNearAvailableMapTiles(self, theMap, tile, radius):
		xval = int(round(tile.x))
		yval = int(round(tile.y))
		result = list()
		for xindex in range(xval - radius, xval + radius, self.pathPrecision):
			for yindex in range(yval - radius, yval + radius, self.pathPrecision):
				#if we're on the map and it's not a blocked space
				if xindex >= 0 and yindex >= 0 and xindex <= len(theMap) and yindex <= len(theMap[0]) and theMap[xindex][yindex] == 0:
					result.append(Vector2(xindex,yindex))
		return result

	#this function determines whether or not a tile is adjacent to another tile
	#containing a height greater than zero
	def tileIsWallAdjacent(self, theMap, tile, radius):
		xval = int(round(tile.x))
		yval = int(round(tile.y))
		for xindex in range(xval - radius, xval + radius, self.pathPrecision):
			for yindex in range(yval - radius, yval + radius, self.pathPrecision):
				#if we're along the edge of the map or along a wall
				if xindex <= 0 or yindex <= 0 or xindex >= len(theMap) or yindex >= len(theMap[0]) or theMap[xindex][yindex] > 0:
					return True
		return False

	#def frange(this, end, start=0, inc=0, precision=1):
	#	"""A range function that accepts float increments."""
	#
	#	if not start:
	#		start = end + 0.0
	#		end = 0.0
	#	else:
	#		end += 0.0
	#	
	#	if not inc:
	#		inc = 1.0
	#	count = int(math.ceil((start - end) / inc))
	#	
	#	L = [None] * count
	#	
	#	L[0] = end
	#	for i in (xrange(1,count)):
	#		L[i] = L[i-1] + inc
	#	return L
