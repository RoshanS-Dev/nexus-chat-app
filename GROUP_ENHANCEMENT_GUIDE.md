# NEXUS Group Chat Enhancement - Developer Guide

## Quick Reference

### Backend Integration

#### Environment Setup
```bash
# No new environment variables needed
# Existing Cloudinary config works for group avatars
```

#### Database
```javascript
// Existing Group collections will auto-populate new fields
// No migration required
```

### Frontend Integration

#### Import New Components
```javascript
import GroupDetails from './components/GroupDetails';
import GroupSettings from './components/GroupSettings';
import MemberManagement from './components/MemberManagement';
```

#### Use Group Service
```javascript
import { groupService } from '../services/groupService';

// Get group members with search
const members = await groupService.getGroupMembers(groupId, 'search term');

// Promote member to admin
await groupService.promoteToAdmin(groupId, memberId);

// Get shared media
const media = await groupService.getGroupMedia(groupId, 'media', 1, 20);

// Generate invite link
const { inviteCode } = await groupService.regenerateInviteCode(groupId);
```

#### Redux Usage
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { updateGroup, removeGroup } from '../redux/slices/groupSlice';

const dispatch = useDispatch();
const { groups, selectedGroup } = useSelector(state => state.group);

// Update group in state
dispatch(updateGroup(updatedGroupData));

// Remove group
dispatch(removeGroup(groupId));
```

#### Socket Events to Handle
```javascript
import socketService from '../services/socket';

// Listen for group events
socketService.on('member_promoted', (data) => {
  // data: { memberId, groupId }
  console.log(`${data.memberId} promoted to admin`);
});

socketService.on('admin_transferred', (data) => {
  // data: { oldAdmin, newAdmin, groupId }
  console.log(`Admin transferred from ${data.oldAdmin} to ${data.newAdmin}`);
});

socketService.on('group_settings_updated', (groupData) => {
  // Update local group data
});
```

---

## API Endpoints Reference

### Member Operations
```
POST   /api/groups/:groupId/members/:memberId/promote
POST   /api/groups/:groupId/members/:memberId/demote
POST   /api/groups/:groupId/transfer-admin/:newAdminId
GET    /api/groups/:groupId/members?search=query
```

### Admin Operations
```
PUT    /api/groups/:groupId/settings
POST   /api/groups/:groupId/avatar
DELETE /api/groups/:groupId/avatar
POST   /api/groups/:groupId/pin-message/:messageId
```

### Invite System
```
POST   /api/groups/:groupId/regenerate-invite
POST   /api/groups/join/:inviteCode
GET    /api/groups/:groupId/media?type=all|media|files&page=1&limit=20
```

---

## Component Props Reference

### GroupDetails
```typescript
interface GroupDetailsProps {
  group: GroupType;              // Full group object
  onClose?: () => void;          // Close handler
  onSettingsClick?: () => void;  // Settings button handler
}
```

**Features:**
- Info tab (details, rules, admin info, invite link)
- Members tab (searchable member list with roles)
- Media tab (shared media gallery)

### GroupSettings
```typescript
interface GroupSettingsProps {
  group: GroupType;                    // Full group object
  onClose?: () => void;                // Close handler
  onUpdate?: (group: GroupType) => void; // Update callback
}
```

**Features:**
- Avatar management (upload/remove)
- Settings (name, description, rules, announcement mode, invite link)
- Delete group (danger zone)

### MemberManagement
```typescript
interface MemberManagementProps {
  group: GroupType;                    // Full group object
  onClose?: () => void;                // Close handler
  onUpdate?: (group: GroupType) => void; // Update callback
}
```

**Features:**
- Member search
- Promote/demote admins
- Remove members
- Transfer admin role

---

## Usage Examples

### Opening Group Details
```javascript
import { useState } from 'react';
import GroupDetails from './GroupDetails';

function MyComponent() {
  const [showDetails, setShowDetails] = useState(false);
  const [group, setGroup] = useState(null);

  return (
    <>
      <button onClick={() => {
        setShowDetails(true);
        // setGroup(selectedGroup);
      }}>
        Group Info
      </button>

      {showDetails && group && (
        <GroupDetails
          group={group}
          onClose={() => setShowDetails(false)}
          onSettingsClick={() => {
            // Show settings instead
          }}
        />
      )}
    </>
  );
}
```

### Promoting a Member
```javascript
async function promoteUserToAdmin(groupId, userId) {
  try {
    const updatedGroup = await groupService.promoteToAdmin(groupId, userId);
    dispatch(updateGroup(updatedGroup));
    toast.success('Member promoted to admin');
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
}
```

### Handling Invite Links
```javascript
function InviteSection({ group }) {
  const copyInvite = () => {
    const link = `${window.location.origin}/groups/join/${group.inviteCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Copied invite link!');
  };

  return (
    <div>
      <input 
        readOnly 
        value={`/groups/join/${group.inviteCode}`}
      />
      <button onClick={copyInvite}>Copy</button>
    </div>
  );
}
```

### Joining Group via Invite
```javascript
async function joinGroupByInvite(inviteCode) {
  try {
    const group = await groupService.joinGroupViaInvite(inviteCode);
    dispatch(addGroup(group));
    navigate(`/chat/${group._id}`);
    toast.success('Joined group!');
  } catch (error) {
    toast.error('Invalid or expired invite code');
  }
}
```

### Getting Group Media
```javascript
async function loadGroupPhotos(groupId) {
  try {
    const result = await groupService.getGroupMedia(groupId, 'media', 1, 20);
    // result: { messages, total, page, totalPages }
    setPhotos(result.messages);
  } catch (error) {
    console.error('Failed to load media');
  }
}
```

---

## Common Patterns

### Permission Checking
```javascript
const isAdmin = group?.admin?._id === user?._id;
const isAdminMember = group?.admins?.some(a => a._id === user?._id);
const isMember = group?.members?.some(m => m._id === user?._id);
const isOwner = group?.admin?._id === user?._id;

// Use in templates
{isAdmin && <SettingsButton />}
{!isMember && <JoinButton />}
{isOwner && <TransferAdminButton />}
```

### Error Handling
```javascript
try {
  await groupService.operation();
} catch (error) {
  const message = error.response?.data?.message || 'Operation failed';
  toast.error(message);
}
```

### Loading States
```javascript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await groupService.operation();
  } finally {
    setLoading(false);
  }
};

<button disabled={loading}>
  {loading ? 'Loading...' : 'Action'}
</button>
```

---

## Debugging

### Check Group Data in Redux
```javascript
// In browser console
store.getState().group.selectedGroup

// Components
const group = useSelector(state => state.group.selectedGroup);
console.log('Current group:', group);
```

### Monitor Socket Events
```javascript
socketService.on('member_promoted', data => {
  console.log('Member promoted:', data);
});

socketService.on('group_settings_updated', data => {
  console.log('Group updated:', data);
});
```

### Test API Endpoints
```bash
# Get members with search
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:5000/api/groups/:id/members?search=john"

# Regenerate invite code
curl -X POST -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/groups/:id/regenerate-invite

# Join via invite
curl -X POST -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/groups/join/abc123def456
```

---

## Performance Tips

### Optimize Member Lists
```javascript
// Use windowing for large lists
import { FixedSizeList } from 'react-window';

// Only render visible members
<FixedSizeList
  height={400}
  itemCount={members.length}
  itemSize={60}
>
  {renderMember}
</FixedSizeList>
```

### Limit Media Queries
```javascript
// Pagination instead of loading all at once
const page1 = await groupService.getGroupMedia(groupId, 'media', 1, 20);
const page2 = await groupService.getGroupMedia(groupId, 'media', 2, 20);
```

### Debounce Search
```javascript
import { debounce } from 'lodash';

const searchMembers = debounce(async (query) => {
  const members = await groupService.getGroupMembers(groupId, query);
  setResults(members);
}, 300);
```

---

## Troubleshooting

### Group Not Updating
- Check Redux dispatch call
- Verify group._id matches selected group
- Clear browser cache if needed
- Check network tab for failed requests

### Invite Link Not Working
- Verify inviteCodeEnabled is true
- Check invite code format (should be 16 chars hex)
- Ensure /api/groups/join/:code route is defined
- Test with fresh browser session

### Permission Errors
- Verify user._id vs group.admin._id
- Check if user is in group.members array
- Confirm admin operations use correct endpoint
- Test with admin account first

### Socket Events Not Triggering
- Check if socket connection is active
- Verify event name matches backend emit
- Check browser console for socket errors
- Ensure socket.on() called before action

---

## Deployment Notes

### Pre-deployment
1. Test all 14 new endpoints
2. Verify socket events broadcasting
3. Check Cloudinary upload limits
4. Review database indices

### Post-deployment
1. Monitor error logs
2. Check socket connection stability
3. Test invite links with fresh users
4. Verify member search performance

### Rollback Plan
1. Revert frontend to previous commit
2. Disable new routes (comment out in routes)
3. Clear browser cache/cookies
4. No database changes required

---

## Support & Resources

**Existing Documentation:**
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- API: See ENDPOINTS_REFERENCE.md (if available)

**New Features:**
- See NEXUS_GROUP_ENHANCEMENT.md for full details
- Check socket events in socketHandler.js
- Review validation in groupController.js

**Issues:**
- Check browser console for errors
- Check server logs for API errors
- Verify Redux DevTools for state issues
- Test with curl before blaming frontend
