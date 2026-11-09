/** The root of every OpenBracketFormat business object. */
export interface Tournament {
    /** The [event]{@link Event} details for the entire tournament — e.g., name, start date,
     * tournament format, etc. */
    event: Event
    /** A group of [sets]{@link Set} belonging to an event. */
    sets: Set[]
    /** A group of [entrants]{@link Entrant} belonging to an event. */
    entrants: Entrant[]
    /** Stores the version of the Open Bracket Format specification that this file was generated in accordance with.
     * It is highly recommended (but not required) to include this field — if this field is not set,
     * the default assumption will be that the file was generated with the most recent version of OBF. */
    version?: string
}

/** Details for the entire event, such as the name, date,
 * game played, the format of the tournament, etc. */
export interface Event {
    /** The title for this event. This is a required field. */
    name: string
    /** The current [state]{@link EventState} of the event. This is a required field. */
    state: EventState
    /** The start date for this event.
     * It's recommended to use the [ISO 8601 format]{@link https://www.w3.org/TR/NOTE-datetime} (YYYY-MM-DD). */
    date: string
    /** The title of the game being played in this event. */
    gameName: string
    /** The [format]{@link TournamentStructures} for this tournament.
     * This field should describe the structure of the tournament
     * (e.g., how matches are decided) and not format as it pertains to game-specific factors
     * (e.g., whether it's a team tournament, the ruleset in use, etc.). */
    tournamentStructure: TournamentStructures | string
    /** The [phases]{@link Phase} related to this event.
     * Useful for describing complex tournament structures,
     * like round-robin pools leading into a double-elimination bracket
     * (where different phases may have different structures). */
    phases?: Phase[]
    /** The ruleset for this event. */
    ruleset: string
    /** The original source where this event took place (e.g., an external tournament website). */
    originURL: string
    /** The total number of [entrants]{@link Entrant} in this tournament.
     * This number should equal the same amount entrants at the [top-level field]{@link Tournament.entrants}. */
    numberEntrants: number
    /** An object for storing additional event-related information not covered by the previously mentioned fields. */
    other?: any
}

/** Represents an entrant in the [tournament]{@link Tournament}. */
export interface Entrant {
    /** A unique ID corresponding to this entrant.
     * These IDs are mapped to the [entrant 1]{@link Set.entrant1ID} and [entrant 2]{@link Set.entrant2ID} IDs found in each [set]{@link Set}.
     * This is a required field. */
    entrantID: string
    /** A unique name associated with this entrant. */
    entrantTag: string
    /** A weighted number representing the initial seeding of this entrant (lower seeds are at the top). */
    initialSeed: number
    /** The final placement for this entrant (only used after an event is completed). */
    finalPlacement?: number
    /** List of personal data about players corresponding to this entrant (e.g., legal name, country, etc.).
     * If this entrant corresponds to a single player, this will be a list of size one.
     * If it is a team of several players, there will be one entry per player. */
    personalInformation: PersonalInformation[]
    /** An object for storing any additional entrant-related information not covered by the previously mentioned fields. */
    other?: any
}

/** Represents personal information (e.g., name, country) associated with an [entrant]{@link Entrant}. */
export interface PersonalInformation {
    /** Entrant's legal name. */
    name?: string
    /** Entrant's country. */
    country?: string
    /** Entrant's tag. Same as [entrantTag]{@link Entrant.entrantTag} if not part of a team. */
    tag: string
    /** Prefix for entrant's tag. */
    prefix?: string
    /** An object for storing any additional entrant-related information not covered by the previously mentioned fields. */
    other?: any
}

/** Represents a single set of the tournament. */
export interface Set {
    /** A unique identifier for this set.
     * This is a required field and should be ordered with the rest of the set IDs. */
    setID: string
    /** The [ID]{@link Entrant.entrantID} for the first entrant. */
    entrant1ID: string | undefined
    /** The [ID]{@link Entrant.entrantID} of the second entrant. */
    entrant2ID: string | undefined
    /** The current [status]{@link SetStatus} for this set. This field is required. */
    status: SetStatus
    /** The final [result]{@link SetGameResult} for entrant 1. */
    entrant1Result?: SetGameResult
    /** The final [result]{@link SetGameResult} for entrant 2. */
    entrant2Result?: SetGameResult
    /** The score for entrant 1. */
    entrant1Score: number
    /** The score for entrant 2. */
    entrant2Score: number
    /** The [ID]{@link Set.setID} of the set that entrant 1 will advance to (if there is one).*/
    entrant1NextSetID?: string
    /** The [ID]{@link Set.setID} of the set that entrant 2 will advance to (if there is one).*/
    entrant2NextSetID?: string
    /** The previous [ID]{@link Set.setID} of the set that entrant 1 came from (if there is one).*/
    entrant1PrevSetID?: string
    /** The previous [ID]{@link Set.setID} of the set that entrant 2 came from (if there is one).*/
    entrant2PrevSetID?: string
    /** The format for this set (e.g., whether it was best of 3 or best of 5). */
    setFormat: string
    /** The [phase]{@link Phase} of this specific set. */
    phaseID: string
    /** The round in the bracket of this specific set (for example, "Winner's Round 1" or "Semifinals").
     * It is up to the user's discretion to decide what precisely a round means and how to record it. */
    roundID: string
    /** The [games]{@link Game} belonging to this [set]{@link Set}.
     * It is recommended (but not required) that this array records the games in chronological order. */
    games: Game[]
    /** An object for storing additional set-related information not covered by the previously mentioned fields. */
    other?: any
}

/** Represents a single game of a set. */
export interface Game {
    /** The order in which this game appears in a set. Spans a consecutive range of integers starting at 1. */
    gameNumber: number
    /** The characters played by entrant 1 in this game.
     * If only a single character is used in this game,
     * this field should contain an array containing a single string.
     * In team games or games where each entrant can choose a selection of different characters,
     * you should record these characters as separate elements of this field. */
    entrant1Characters: string[]
    /** The characters played by entrant 2 in this game.
     * If only a single character is used in this game,
     * this field should contain an array containing a single string.
     * In team games or games where each entrant can choose a selection of different characters,
     * you should record these characters as separate elements of this field. */
    entrant2Characters: string[]
    /** The stage this game was played on. */
    stage: string
    /** The [result]{@link SetGameResult} for entrant 1. */
    entrant1Result?: SetGameResult
    /** The [result]{@link SetGameResult} for entrant 2. */
    entrant2Result?: SetGameResult
    /** An object for storing additional game-related information not covered by the previously mentioned fields. */
    other?: any
}

/** Represents a single phase of a tournament (e.g., pools, top 64, etc.)
 * It is up to the user to define a "phase" is.
 * Useful for recording tournaments with complex structures
 * (e.g., round-robin pools into a double-elimination bracket). */
export interface Phase {
    /** The unique ID corresponding to this phase. This is a required field. */
    phaseID: string
    /** The [format]{@link Event.tournamentStructure} for this phase
     * (e.g., single-elimination, double-elimination, etc.). */
    phaseStructure: string
    /** An object for storing additional phase-related information not covered by the previously mentioned fields. */
    other?: any
}

export enum SetStatus {
    Completed = "completed",
    Started = "started",
    Pending = "pending",
}

export enum SetGameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
    Disqualified = "disqualified",
    Pending = "pending",
}

export enum EventState {
    Open = "open",
    Pending = "pending",
    Started = "started",
    Completed = "completed",
    Finalized = "finalized",
}

export enum TournamentStructures {
    SingleElimination = "single elimination",
    DoubleElimination = "double elimination",
    RoundRobin = "round robin",
}
