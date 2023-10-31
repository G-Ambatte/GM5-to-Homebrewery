javascript:(function(){
if(location.href=='https://homebrewery.naturalcrit.com/new'){
	const inputText = prompt('Enter source text:');
	const regExStr = /<(\S+?)>([\s\S]*?)<\/\1>/gi;
	const matches = Array.from(inputText.matchAll(regExStr));
	
	let outputText = '';

	matches.forEach((match)=>{
		console.log(match);
		if(match[1].toString()=='monster') {
			const output = {};

			const inputValues = Array.from(match[2].matchAll(regExStr));
			inputValues.forEach((value)=>{
				output[value[1]] = output[value[1]] ? [ ...output[value[1]], value[2] ] : [ value[2] ];
			});
		

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

			const sizeMap = {
				't' : 'Tiny',
				's' : 'Small',
				'm' : 'Medium',
				'l' : 'Large',
				'h' : 'Huge',
				'g' : 'Gargantuan'
			};
			output.size[0] = sizeMap[output.size[0]?.toLowerCase()];

			if(outputText.length > 0){ outputText += '\n\\page\n'}
			let monsterText;
			try { monsterText = `{{monster,frame,wide\n
				## ${output.name ? output.name[0] : 'Unnamed Monster'}\n
				*${output.size ? output.size[0] : 'Variable size'} ${output.type ? output.type[0] : 'unknown'}, ${output.alignment ? output.alignment[0] : 'no known alignment'}*\n
				___\n
				**Armor Class** :: ${output.ac ? output.ac[0] : '99'}\n
				**Hit Points**  :: ${output.hp ? output.hp[0] : '9999'}\n
				**Speed**       :: ${output.speed ? output.speed[0] : 'none'}\n
				___\n
				|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n
				|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n
				|${output.str ? output.str[0] : '10'}|${output.dex ? output.dex[0] : '10'}|${output.con ? output.con[0] : '10'}|${output.int ? output.int[0] : '10'}|${output.wis ? output.wis[0] : '10'}|${output.cha ? output.cha[0] : '10'}|\n
				___\n
				${output.save ? `**Saves** :: ${output.save.join(',')}\n` : ''}
				${output.skill ? `**Skills** :: ${output.skill.join(',')}\n` : ''}
				${output.skill || output.save ? '\n:\n' : ''}
				${output.vulnerable ? `**Damage Vulnerabilities** :: ${output.vulnerable.join(', ')}\n` : ''}
				${output.resist ? `**Damage Resistances** :: ${output.resist.join(', ')}\n` : ''}
				${output.immune ? `**Damage Immunities** :: ${output.immune.join(', ')}\n` : ''}
				${output.conditionImmune ? `**Condition Immunities** :: ${output.conditionImmune.join(', ')}\n` : ''}
				${output.senses ? `**Senses** :: ${output.senses[0]}` : 'No senses'}, ${output.passive ? `Passive Perception ${output.passive[0]}` : ''}\n
				${output.langauges ? `**Languages** :: ${output.languages[0]}\n` : ''}
				${output.cr ? `**Challenge** :: ${output.cr[0]}\n` : ''}
				___\n
				${output.trait ? output.trait.map((trait)=>{ return `**${trait.name}.** ${trait.text}`}).join('\n:\n') : ''}
				${output.reaction ? `:\n#### Reactions\n${output.reaction.map((reaction)=>{ return `**${reaction.name}.** ${reaction.text}`}).join('\n:\n')}` : ''}
				${output.action ? `\n### Actions\n${output.action.map((action)=>{ return `**${action.name}.** ${action.text}`}).join('\n:\n')}` : ''}
				${output.legendary ? `\n### Legendary Actions\n${output.legendary.map((legendary)=>{ return `**${legendary.name}.** ${legendary.text}`}).join('\n:\n')}` : ''}
				\n
				}}\n
				`;
			} catch (err){
				monsterText = `Failed to process monster\n${err}`;
			}
			outputText += monsterText;
		}
	});

	localStorage.setItem('homebrewery-new', outputText);
	localStorage.removeItem('homebrewery-new-style');
	localStorage.setItem('homebrewery-new-meta','{"renderer":"V3"}');
	location.reload();
	};
})();