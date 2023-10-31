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

	const processData = (data)=>{
		return data.map((trait)=>{
			const dataObject= {};
			const dataArray = Array.from(trait.matchAll(regExStr));
			dataArray.forEach((dataInfo)=>{ dataObject[dataInfo[1]] = dataInfo[2]; });
			return dataObject;
		});
	};

	processItems = ['action','reaction','trait', 'legendary'];
	processItems.forEach((item)=>{
		if(output[item]?.length > 0){
			output[item] = processData(output[item]);
		};
	});
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
		**Saves** :: ${output.save?.length > 0 ? output.save.join(',') : 'none'}\n
		**Skills** :: ${output.skill?.length > 0 ? output.skill.join(',') : 'none'}\n
		:\n
		**Damage Vulnerabilities** :: ${output.vulnerable?.length > 0 ? output.vulnerable.join(', ') : 'none'}\n
		**Damage Resistances**     :: ${output.resist?.length > 0 ? output.resist.join(', ') : 'none'}\n
		**Damage Immunities**      :: ${output.immune?.length > 0 ? output.immune.join(', ') : 'none'}\n
		**Condition Immunities**   :: ${output.conditionImmune?.length > 0 ? output.conditionImmune.join(', ') : 'none'}\n
		**Senses**                 :: ${output.senses}, Passive Perception ${output.passive[0]}\n
		**Languages**              :: ${output.languages[0]}\n
		**Challenge**              :: ${output.cr[0]}\n
		___\n
		${output.trait?.length > 0 ? output.trait.map((trait)=>{ return `**${trait.name}.** ${trait.text}`}).join('\n:\n') : ''}
		:\n
		#### Reactions\n
		${output.reaction?.length > 0 ? output.reaction.map((reaction)=>{ return `**${reaction.name}.** ${reaction.text}`}).join('\n:\n') : ''}
		\n
		### Actions\n
		${output.action?.length > 0 ? output.action.map((action)=>{ return `**${action.name}.** ${action.text}`}).join('\n:\n') : ''}
		\n
		### Legendary Actions\n
		${output.legendary?.length > 0 ? output.legendary.map((legendary)=>{ return `**${legendary.name}.** ${legendary.text}`}).join('\n:\n') : ''}
		\n
		}}\n
		`;

	localStorage.setItem('homebrewery-new', outputText);
	localStorage.removeItem('homebrewery-new-style');
	localStorage.setItem('homebrewery-new-meta','{"renderer":"V3"}');
	location.reload();
	};
})();