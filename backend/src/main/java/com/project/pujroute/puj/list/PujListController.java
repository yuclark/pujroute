@RestController
@RequestMapping("/api/pujs")
// ✅ removed @CrossOrigin
public class PujListController {

    private final PujListService pujListService;

    public PujListController(PujListService pujListService) {
        this.pujListService = pujListService;
    }

    @GetMapping
    public Map<String, Object> getAll(@RequestParam(required = false) String search) {
        List<PujRoute> list = pujListService.getAll(search);
        Map<String, Object> res = new HashMap<>();
        res.put("pujs", list);
        return res;
    }
}