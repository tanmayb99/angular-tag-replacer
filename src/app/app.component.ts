import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  regex = /^[a-zA-Z0-9_]*$/
  title = 'tags-replacement';
  userInput: string = "";
  userOutput: string = '';
  tags: any[] = [
    { tag: '', replacement: '', selected: false },
  ]
  selectAllValue: boolean = false;

  constructor(){}

  ngOnInit(): void {
    this.userOutput = this.userInput
  }

  replace(){
    this.userOutput = this.userInput
  }

  addField(){
    this.tags.push({ tag: '', replacement: '', selected: false })
  }

  removeField(){
    this.tags = this.tags.filter(tag=> tag.selected !== true)
  }

  selectAll(){
    this.tags.forEach(tag => tag.selected = !this.selectAllValue)
  }

  replaceText(){
    let splittedWords = this.userInput.split(' ')
    let splittedIdentifiers = splittedWords.filter(word => word.startsWith('{') && word.endsWith('}'))
    let identifiers = splittedIdentifiers.map(identifier => identifier.substring(1, identifier.length - 1))

    identifiers = identifiers.filter(identifier => this.regex.test(identifier))

    let tags = this.tags.filter(tag => tag.selected === true)

    for(let i=0; i<splittedWords.length;i++){
      if(splittedWords[i].startsWith('{') && splittedWords[i].endsWith('}')){
        let identifier = splittedWords[i].substring(1, splittedWords[i].length - 1)
        if(identifiers.includes(identifier)){
          let tag = tags.find(tag => tag.tag === identifier)
          if(tag){
            splittedWords[i] = tag.replacement
          }
        }
      }
    }
    this.userOutput = splittedWords.join(' ')
    this.checkForEscapingTags(this.userOutput)

  }

  checkForEscapingTags(input: string){
    let splittedWords = input.split(' ')
    splittedWords = splittedWords.map(word => {
      return word.startsWith('\\') ? word = word.substring(1, word.length) : word = word
    })
    console.log(splittedWords)
    this.userOutput = splittedWords.join(' ')

  }

  checkTag(tag: any){
    if(!this.regex.test(tag.tag)) tag.replacement = 'INVALID TAG'
    else if( tag.replacement === 'INVALID TAG' ) tag.replacement = ''
  }

}
