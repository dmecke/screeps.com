import {Tree_Tree} from "../Tree/Tree";
import {Tree_Composite_Priority} from "../Tree/Composite/Priority";
import {Tree_Composite_Sequence} from "../Tree/Composite/Sequence";
import {Check_HostileCreepInRoom} from "../Check/HostileCreepInRoom";
import {Action_AssignNearestHostileCreepAsTarget} from "../Action/AssignNearestHostileCreepAsTarget";
import {Action_MoveToTarget} from "../Action/MoveToTarget";
import {Action_AttackTarget} from "../Action/AttackTarget";
import {Action_RangeAttackTarget} from "../Action/RangeAttackTarget";
import {Check_IsInTargetRoom} from "../Check/IsInTargetRoom";
import {Action_MoveToTargetRoom} from "../Action/MoveToTargetRoom";
import {Action_AssignNearestRampartAsTarget} from '../Action/AssignNearestRampartAsTarget';

export = new Tree_Tree(
    "Defender",
    new Tree_Composite_Sequence([
        new Tree_Composite_Priority([
            new Check_IsInTargetRoom(),
            new Action_MoveToTargetRoom(),
        ]),
        new Tree_Composite_Priority([
            new Tree_Composite_Sequence([
                new Check_HostileCreepInRoom(),
                new Action_AssignNearestHostileCreepAsTarget(),
                new Tree_Composite_Priority([
                    new Action_RangeAttackTarget(),
                    new Action_AttackTarget(),
                    new Action_MoveToTarget(),
                ]),
            ]),
            new Tree_Composite_Sequence([
                new Action_AssignNearestRampartAsTarget(),
                new Action_MoveToTarget(),
            ]),
        ]),
    ]),
);
