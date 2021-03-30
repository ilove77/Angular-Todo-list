export class Todo {
    private title = ''; 
    private completed = false;

    constructor(title: string) {
        this.title = title || ''; // 為避免傳入的值為 Falsy 值，稍作處理
    }

    getTitle(): string {
        return this.title;
    }
    get done(): boolean {
        return this.completed;
    }
    
    toggleCompletion(): void {
        this.completed = !this.completed;
    }
   

}
