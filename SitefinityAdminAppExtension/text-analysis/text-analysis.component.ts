import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Component({
    templateUrl: "./text-analysis.component.html",
    styleUrls: [ "./text-analysis.css" ]
})
export class TextAnalysisComponent implements OnInit {
    public isVisible: boolean = false;
    public editorHost: any;

    protected hashtags: Array<string>;
    protected categories: Array<string>;
    protected sentiment: any;
    protected summary: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private http: HttpClient) { }
    
    ngOnInit() {
        Observable
            .fromEvent(this.editorHost.context, "focusin")
            .subscribe(() => {
                if (!this.isVisible) {
                    this.isVisible = true;
                    this.changeDetectorRef.detectChanges();
                }
            });
    }

    handleAnalyzeClick(event: any) {
        let text = this.getKendoEditorStrippedValue();
        if (!text) {
            return;
        }

        this.getHashtags(text).subscribe((hashtags) => {
            this.hashtags = hashtags;
            this.changeDetectorRef.detectChanges();
        });

        this.getSentiment(text).subscribe((sentiment) => {
            this.sentiment = sentiment;
            this.changeDetectorRef.detectChanges();
        });

        this.getSummary(text, text, 1).subscribe((summary) => {
            this.summary = summary;
            this.changeDetectorRef.detectChanges();
        });

        this.getCategories(text).subscribe((categories) => {
            this.categories = categories;
            this.changeDetectorRef.detectChanges();
        });
    }

    getKendoEditorStrippedValue(): string {
        let div = document.createElement("div");
        div.innerHTML = this.editorHost.getKendoEditor().value();

        let strippedText:string = div.innerText.replace(/[,.!?:;](?=\S)/g, '$& ');

        return strippedText;
    }

    getHashtags(text: string): Observable<Array<string>> {
        let url:string = `/webapi/CognitiveServices/Hashtags`;

        return this.http.post(url, JSON.stringify({ "Text": text }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(result => result["hashtags"]);
    }

    getSentiment(text: string): Observable<any> {
        let url:string = `/webapi/CognitiveServices/Sentiment`;

        return this.http.post(url, JSON.stringify({ "Text": text }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    getSummary(title: string, text: string, sentencesNumber: number): Observable<string> {
        let url:string = `/webapi/CognitiveServices/Summarize`;

        return this.http.post(url, JSON.stringify({ "Title": title, "Text": text, "SentencesNumber": sentencesNumber }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(result => result["Sentences"].join(" "));
    }

    getCategories(text: string): Observable<Array<string>> {
        let url:string = `/webapi/CognitiveServices/Classify`;

        return this.http.post(url, JSON.stringify({ "Text": text, "Taxonomy": "iptc-subjectcode" }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(result => result["Categories"]);
    }
}