const Queue = require('../src/queue');
const MaxHeap = require('../src/max-heap');

describe('PriorityQueue', () => {
	describe('#constructor', () => {
		it('assings passed maxSize or set it to default value 30', () => {
			const q = new Queue(10);
			const qWithDefaultMaxSize = new Queue();

			expect(q.maxSize).to.equal(10);
			expect(qWithDefaultMaxSize.maxSize).to.equal(30);
		});

		it('assings new MaxHeap to this.heap', () => {
			const q = new Queue();

			expect(q.heap).to.be.instanceof(MaxHeap);
		});
	});

	

	describe('#shift', () => {
		let q;

		beforeEach(() => {
			q = new Queue();
		});

		
		it('should handle items with same priority (return in the same order this items have been added)', () => {
			const expectedData = [3, 5, 1, 0, 4, 2];

			q.push(0, 10);
			q.push(1, 15);
			q.push(2, 4);
			q.push(3, 17);
			q.push(4, 6); // miss it
			q.push(5, 17);

			for (var i = 0; i < 6; i++) {
				expect(q.shift()).to.equal(expectedData[i]);
			}
		});
	});


	describe('#isEmpty', () => {
		it('return true if queue is empty', () => {
			const q = new Queue();


		});
	});
});
