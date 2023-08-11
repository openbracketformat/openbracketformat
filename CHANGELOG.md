*v1.0*
- Added 'dq' to player result field
- Change 'winnerNextSet' and 'loserNextSet' to 'entrant1NextSet' and 'entrant2NextSet'
- Change 'personalInformation' field to an array

*v0.2*
- Adds a `version` field to `Tournament`. The current version number can always be found in the end of the description for the `version` field in the JSON schema. Going forward, any change which modifies the Open Bracket Format schema beyond changing description text will be reflected by a new version number and a corresponding entry in this document.
- Changed the `entrant1Character` and `entrant2Character` string fields in `Game` to `entrant1Characters` and `entrant2Characters` fields which are arrays of strings. This makes it easier to consistently record character information for team games or games where a player selects multiple characters (some fighting games).

*v0.1*
- Initial release of Open Bracket Format.
