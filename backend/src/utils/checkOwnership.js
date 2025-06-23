
function checkOwnership(resourceOwnerId, currentUserId) {
  if (!resourceOwnerId || !currentUserId) {
    throw new Error("Ownership check failed: Missing IDs");
  }

  if (resourceOwnerId.toString() !== currentUserId.toString()) {
    throw new Error("Unauthorized: You do not own this resource");
  }
}

module.exports = checkOwnership;
