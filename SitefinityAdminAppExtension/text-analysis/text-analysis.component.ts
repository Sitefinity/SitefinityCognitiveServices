import { Component, OnInit, ChangeDetectorRef, ElementRef } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

declare namespace ng {
    function probe(element: Element): ElementRef;
}

@Component({
    templateUrl: "./text-analysis.component.html",
    styleUrls: ["./text-analysis.css"]
})
export class TextAnalysisComponent implements OnInit {
    public isVisible: boolean = false;
    public editorHost: any;

    protected hashtags: Array<string>;
    protected categories: Array<string>;
    protected sentiment: any;
    protected summary: string;
    protected summaryFixture;
    protected tagsFixture;
    protected categoryFixture;

    // Uncomment for production
    //
    protected serviceUrl = "";

    // Uncomment and change the url:port fi you developing extension with: npm start
    //
    // protected serviceUrl = "http://localhost:8033";

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

        this.summaryFixture = ng.probe(document.querySelectorAll("[ng-reflect-name='Summary']")[0]);

        let taxContainer = document.querySelectorAll("[ng-reflect-name='Tags']")[0];
        if (taxContainer) {
            let tagsEl = taxContainer.querySelectorAll("sf-taxa")[0];
            this.tagsFixture = ng.probe(tagsEl);
        }
        let categoryContainer = document.querySelectorAll("[ng-reflect-name='Category']")[0];
        if (categoryContainer) {
            let categoryEl = categoryContainer.querySelectorAll("sf-taxa")[0];
            this.categoryFixture = ng.probe(categoryEl);
        }
    }

    onAddSummary(e) {
        if (this.summaryFixture) {
            this.summaryFixture.componentInstance.writeValue(this.summary);
            this.summaryFixture.componentInstance.detector.detectChanges();
            this.setCheckMark(e);
        }
    }

    onAddTag(e, tagText) {
        if (this.tagsFixture) {
            this.tagsFixture.componentInstance.onTaxaEntered(tagText);
            this.setCheckMark(e);
        }
    }

    onAddCategory(e, categorySugestion) {
        if (this.categoryFixture) {
            this.categoryFixture.componentInstance.onTaxaEntered(categorySugestion.Label);
            this.setCheckMark(e);
        }
    }

    onAnalyzeClick() {
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


    private setCheckMark(e: MouseEvent) {
        let button: HTMLButtonElement =  <HTMLButtonElement>e.currentTarget;
        button.classList.add("-action");
        let icon: HTMLSpanElement =  <HTMLSpanElement>button.firstElementChild;
        icon.classList.replace("fa-plus", "fa-check");
    }

    getKendoEditorStrippedValue(): string {
        let div = document.createElement("div");
        div.innerHTML = this.editorHost.getKendoEditor().value();

        let strippedText: string = div.innerText.replace(/[,.!?:;](?=\S)/g, '$& ');

        return strippedText;
    }

    getHashtags(text: string): Observable<Array<string>> {
        let url: string = `${this.serviceUrl}/webapi/CognitiveServices/Hashtags`;

        return this.http.post(url, JSON.stringify({ "Text": text }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(result => result["hashtags"]);
    }

    getSentiment(text: string): Observable<any> {
        let url: string = `${this.serviceUrl}/webapi/CognitiveServices/Sentiment`;

        return this.http.post(url, JSON.stringify({ "Text": text }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }

    getSummary(title: string, text: string, sentencesNumber: number): Observable<string> {
        let url: string = `${this.serviceUrl}/webapi/CognitiveServices/Summarize`;

        return this.http.post(url, JSON.stringify({ "Title": title, "Text": text, "SentencesNumber": sentencesNumber }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(result => result["Sentences"].join(" "));
    }

    getCategories(text: string): Observable<Array<string>> {
        let url: string = `${this.serviceUrl}/webapi/CognitiveServices/Classify`;

        return this.http.post(url, JSON.stringify({ "Text": text, "Taxonomy": "iptc-subjectcode" }), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(result => result["Categories"]);
    }

}