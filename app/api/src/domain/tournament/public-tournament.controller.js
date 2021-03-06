"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const team_service_1 = require("./team.service.");
const group_service_1 = require("./group.service");
const match_service_1 = require("./match.service");
const league_service_1 = require("./league.service");
const common_1 = require("@nestjs/common");
const tournament_service_1 = require("./tournament.service");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const round_service_1 = require("./round.service");
let PublicTournamentController = class PublicTournamentController {
    constructor(tournamentService, leagueService, matchService, groupService, teamService, roundService) {
        this.tournamentService = tournamentService;
        this.leagueService = leagueService;
        this.matchService = matchService;
        this.groupService = groupService;
        this.teamService = teamService;
        this.roundService = roundService;
    }
    findAllTeam(request) {
        return this.tournamentService.findIdOfFirstactive().pipe(operators_1.switchMap(tournamentId => this.teamService.findAllForTournament(tournamentId)));
    }
    findAllLeagues(request) {
        return this.tournamentService.findIdOfFirstactive().pipe(operators_1.switchMap(tournamentId => this.leagueService.findAllLeagues(tournamentId)));
    }
    findTeamInfoDto(request, id) {
        return this.teamService.findTeamInfo(id).pipe(operators_1.tap(console.log));
    }
    findAllMatchesForTeam(request, id) {
        return this.teamService.findTeamInfo(id).pipe(operators_1.tap(console.log));
    }
    getGroupInfo(request, id) {
        return this.groupService.findOne({ id }).pipe(operators_1.map((group) => {
            this.tournamentService.processMatchesOfGroup(group);
            return group;
        }), operators_1.map((group) => {
            return Object.assign({}, group, { teams: group.teams.sort(this.tournamentService.compareTeams) });
        }));
    }
    getRoundInfo(id) {
        return this.roundService.findOne({ id }).pipe(operators_1.tap(console.log));
    }
    getMatches(request, ids) {
        const idsToFind = ids.split(',').map(numberString => Number(numberString));
        return this.matchService.findMatchesWithTeam(idsToFind);
    }
    getAllMatches(request, ids) {
        return this.tournamentService.findIdOfFirstactive().pipe(operators_1.switchMap(tournamentId => this.matchService.findAllForTournament(tournamentId)));
    }
};
__decorate([
    common_2.Get('/all/teams'),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "findAllTeam", null);
__decorate([
    common_2.Get('/all/leagues'),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "findAllLeagues", null);
__decorate([
    common_2.Get('/teaminfo/:id'),
    __param(0, common_2.Req()), __param(1, common_2.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "findTeamInfoDto", null);
__decorate([
    common_2.Get('/matches/:teamId'),
    __param(0, common_2.Req()), __param(1, common_2.Param('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "findAllMatchesForTeam", null);
__decorate([
    common_2.Get('/group/:groupId'),
    __param(0, common_2.Req()), __param(1, common_2.Param('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "getGroupInfo", null);
__decorate([
    common_2.Get('/round/:roundId'),
    __param(0, common_2.Param('roundId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "getRoundInfo", null);
__decorate([
    common_2.Get('/match'),
    __param(0, common_2.Req()), __param(1, common_1.Query('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "getMatches", null);
__decorate([
    common_2.Get('/match/all'),
    __param(0, common_2.Req()), __param(1, common_1.Query('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublicTournamentController.prototype, "getAllMatches", null);
PublicTournamentController = __decorate([
    common_2.Controller('public-tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService,
        league_service_1.LeagueService,
        match_service_1.MatchService,
        group_service_1.GroupService,
        team_service_1.TeamService,
        round_service_1.RoundService])
], PublicTournamentController);
exports.PublicTournamentController = PublicTournamentController;
//# sourceMappingURL=public-tournament.controller.js.map