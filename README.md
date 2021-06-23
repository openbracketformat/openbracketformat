# Open Bracket Format (OBF)
### An open standard for tournament bracket data

OBF is a JSON schema for structuring tournament data. It is designed to be as flexible as possible across multiple sports or genres of games, and backwards-compatible as it sees updates. It is also designed to be able to reconstruct brackets out of the JSON data.

There are three main parts to the schema:

```py
{
    "event": {...};
    "entrants": [...];
    "sets": [...];
}
```


#### EVENT
This area carries information about the tournament itself.

Suggested optional fields to support:
- date
- game
- ruleset
- originURL
- numberEntrants

```py
"event": {
    "name": "Jersey Japes",
    // Optional
    "date": 2021-04-20,
};
```

#### ENTRANTS
Each entrant represents one spot in your bracket, and can be either an individual or team. They must have unique identifiers

Suggested optional fields to support:
- entrantTag
- initialSeed
- finalPlacement


```py
"entrants": {
    "entrantID": "324245",
    // Optional
    "entrantTag": "CoolPlayer",
    "initialSeed": 2,
    "finalPlacement": 1,
};
```

#### SETS
A tournament consists of multiple sets. Each set references two entrants that compete, with various rulesets that can determine the outcome. Each set must have a unique identifier. Sets are composed of rounds, which can include information such as character and stage.

Suggested optional fields to support:
- rounds (array)
- entrant1Result
- entrant2Result


```py
"sets": {
    "setID": "24601",
    "entrant1ID": "324245",
    "entrant2ID": "867530",
    // Optional
    "entrant1Result": "win",
    "entrant2Result": "lose",
};
```
