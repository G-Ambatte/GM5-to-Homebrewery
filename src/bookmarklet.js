javascript:(function(){
if(location.href=='https://homebrewery.naturalcrit.com/new'){
	const inputText = prompt('Enter source text:');
	const regExStr = /<(\S+?)>([\s\S]*?)<\/\1>/gi;
	const matches = Array.from(inputText.matchAll(regExStr));
	const output = {};
	if(matches[0][1].toString()=='monster') {
		const inputValues = Array.from(matches[0][2].matchAll(regExStr));
		inputValues.forEach((value)=>{
			output[value[1]] = output[value[1]] ? [ ...output[value[1]], value[2] ] : [ value[2] ];
		});
	}
	console.log(output);

	const outputText = `{{monster,frame,wide\n
		## ${output.name[0]}\n
		*${output.size[0]} ${output.type[0]}, ${output.alignment[0]}*\n
		___\n
		**Armor Class** :: ${output.ac[0]}\n
		**Hit Points**  :: ${output.hp[0]}\n
		**Speed**       :: ${output.speed[0]}\n
		___\n
		|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n
		|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n
		|${output.str[0]}|${output.dex[0]}|${output.con[0]}|${output.int[0]}|${output.wis[0]}|${output.cha[0]}|\n
		___\n
		**Condition Immunities** :: buzzed\n
		**Senses**               :: darkvision 60 ft., passive Perception 12\n
		**Languages**            :: None\n
		**Challenge**            :: 1 (6859 XP)\n
		___\n
		***Big Jerk.*** Whenever this creature makes an attack, it starts telling you how much cooler it is than you.\n
		:\n
		***Onion Stench.*** Any creatures within 5 feet of this thing develops an irrational craving for onion rings.\n
		:\n
		***Big Jerk.*** Whenever this creature makes an attack, it starts telling you how much cooler it is than you.\n
		:\n
		***Pack Tactics.*** These guys work together like peanut butter and jelly.\n
		:\n
		***Hangriness.*** This creature is angry, and hungry. It will refuse to do anything with you until its hunger is satisfied.\n
		\n
		When in visual contact with this creature, you must purchase an extra order of fries, even if they say they aren't hungry.\n
		### Actions\n
		***Abdominal Drop.*** *Melee Weapon Attack:* +4 to hit, reach 5ft., one target. *Hit* 5 (1d6 + 2) \n
		:\n
		***Airplane Hammer.*** *Melee Weapon Attack:* +4 to hit, reach 5ft., one target. *Hit* 5 (1d6 + 2) \n
		:\n
		***Bulldog Rake.*** *Melee Weapon Attack:* +4 to hit, reach 5ft., one target. *Hit* 5 (1d6 + 2) \n
		:\n
		***Abdominal Drop.*** *Melee Weapon Attack:* +4 to hit, reach 5ft., one target. *Hit* 5 (1d6 + 2) \n
		}}\n
		`;

	localStorage.setItem('homebrewery-new', outputText);
	localStorage.removeItem('homebrewery-new-style');
	localStorage.setItem('homebrewery-new-meta','{"renderer":"V3"}');
	location.reload();
	};
})();